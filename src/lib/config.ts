const getBaseUrl = () => {
	if (process.env.NEXT_PUBLIC_VERCEL_URL) {
		return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
	}
	if (process.env.NEXTAUTH_URL) {
		return process.env.NEXTAUTH_URL;
	}
	return 'http://localhost:3000';
};

const baseUrl = getBaseUrl();

export const config = {
	baseUrl,
	apiUrl: `${baseUrl}/api`,
	auth: {
		callbackUrl: baseUrl,
		loginPage: `${baseUrl}/api/auth/signin`,
	},
	redis: {
		url: process.env.REDIS_URL || 'redis://localhost:6379',
		maxRetries: 3,
		connectTimeout: 5000,
	},
	queues: {
		taskQueue: {
			name: 'taskQueue',
			concurrency: 5,
			limiter: {
				max: 10,
				duration: 1000,
			},
		},
	},
};

// For debugging purposes in development
if (process.env.NODE_ENV === 'development') {
	console.log('Current environment:', {
		baseUrl,
		nodeEnv: process.env.NODE_ENV,
		vercelUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
		nextAuthUrl: process.env.NEXTAUTH_URL,
	});
}
