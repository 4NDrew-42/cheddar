import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import UserModel from '../models/User';
import dbConnect from '../lib/mongo';

// Ensure NEXTAUTH_URL is properly set
const productionURL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXTAUTH_URL;

if (!productionURL) {
	console.error('Please set NEXTAUTH_URL or VERCEL_URL environment variable');
}

export const authOptions: NextAuthOptions = {
	debug: true, // Force debug mode to see what's happening
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'your-email@example.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					if (!credentials?.email || !credentials?.password) {
						throw new Error('Email and password are required');
					}

					// Connect to the database
					await dbConnect();

					// Find the user by email
					const user = await UserModel.findOne({ email: credentials.email });
					if (!user) {
						throw new Error('User not found');
					}

					// Compare the provided password using the schema method
					const isValid = await user.comparePassword(credentials.password);
					if (!isValid) {
						throw new Error('Invalid password');
					}

					// Return the user object with additional fields
					return {
						id: user._id.toString(),
						email: user.email,
						name: user.name,
						role: user.role || 'user',
					};
				} catch (error) {
					console.error('Authentication error:', error);
					return null;
				}
			},
		}),
	],
	session: {
		strategy: 'jwt' as const,
		maxAge: 24 * 60 * 60, // 24 hours
	},
	secret: process.env.NEXTAUTH_SECRET,
	useSecureCookies: process.env.NODE_ENV === 'production',
	cookies: {
		sessionToken: {
			name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
			},
		},
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log('SignIn callback:', { user, account, profile, email, credentials });
			return true;
		},
		async jwt({ token, user, account, profile }) {
			if (user) {
				console.log('JWT callback - user found:', user);
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
				token.role = user.role;
			}
			console.log('JWT callback - final token:', token);
			return token;
		},
		async session({ session, token, user }) {
			console.log('Session callback - input:', { session, token, user });
			if (session.user) {
				session.user.id = token.id;
				session.user.email = token.email;
				session.user.name = token.name;
				session.user.role = token.role;
			}
			console.log('Session callback - final session:', session);
			return session;
		},
		async redirect({ url, baseUrl }) {
			console.log('Redirect callback:', { url, baseUrl });
			// Allows relative URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},
	pages: {
		signIn: '/auth/signin',
		error: '/auth/signin',
		signOut: '/auth/signin',
	},
};