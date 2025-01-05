import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { rateLimitMiddleware } from './middleware/rateLimit';

export default withAuth(
	async function middleware(request) {
		// Apply rate limiting to all API routes
		if (request.nextUrl.pathname.startsWith('/api')) {
			const rateLimitResponse = await rateLimitMiddleware(request);
			if (rateLimitResponse) return rateLimitResponse;
		}

		// Continue with auth middleware
		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
		pages: {
			signIn: '/auth/signin',
		},
	}
);

export const config = {
	matcher: [
		'/dashboard/:path*',
		'/api/:path*', // Apply to all API routes
	],
};
