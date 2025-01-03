import { withAuth } from 'next-auth/middleware';

export default withAuth({
	callbacks: {
		authorized: ({ token, req }) => {
			const isAuth = !!token;
			const isApiRoute = req.nextUrl.pathname.startsWith('/api');

			// Allow public API routes (if any)
			if (isApiRoute && !req.nextUrl.pathname.startsWith('/api/posts')) {
				return true;
			}

			// Require authentication for protected routes
			return isAuth;
		},
	},
});

export const config = {
	matcher: ['/calendar/:path*', '/api/posts/:path*'],
};
