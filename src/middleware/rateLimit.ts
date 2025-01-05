import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimits } from '../config/rateLimits';
import redisClient from '../utils/redis';

interface RateLimitError {
	error: {
		code: 'RATE_LIMIT_EXCEEDED';
		message: string;
		reset: number;
	};
}

export async function rateLimitMiddleware(request: NextRequest) {
	const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
	const path = request.nextUrl.pathname;
	const limitKey = getLimitKey(path);
	const { window, max } = rateLimits[limitKey] || rateLimits.default;

	try {
		const currentCount = await incrementRequestCount(ip, path, window);
		const remaining = Math.max(max - currentCount, 0);
		const reset = Math.floor(Date.now() / 1000) + window;

		const response = NextResponse.next();
		response.headers.set('X-RateLimit-Limit', max.toString());
		response.headers.set('X-RateLimit-Remaining', remaining.toString());
		response.headers.set('X-RateLimit-Reset', reset.toString());

		if (currentCount > max) {
			const error: RateLimitError = {
				error: {
					code: 'RATE_LIMIT_EXCEEDED',
					message: `Rate limit exceeded. Try again in ${window} seconds.`,
					reset,
				},
			};
			return NextResponse.json(error, { status: 429 });
		}

		return response;
	} catch (error) {
		console.error('Rate limit error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

function getLimitKey(path: string): keyof typeof rateLimits {
	if (path.startsWith('/api/tasks')) return 'tasks';
	if (path.startsWith('/api/providers')) return 'providers';
	return 'default';
}

async function incrementRequestCount(ip: string, path: string, window: number): Promise<number> {
	const key = `rate_limit:${ip}:${path}`;
	const client = await redisClient;
	const current = await client.incr(key);

	if (current === 1) {
		await client.expire(key, window);
	}

	return current;
}
