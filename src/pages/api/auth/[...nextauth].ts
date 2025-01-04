// src/pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/User';
import dbConnect from '../../../lib/mongo';

export const authOptions: NextAuthOptions = {
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
					const user = await User.findOne({ email: credentials.email });
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
						role: user.role,
					};
				} catch (error) {
					console.error('Authentication error:', error);
					return null;
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 30 * 60, // 30 minutes
	},
	secret: process.env.NEXTAUTH_SECRET,
	useSecureCookies: process.env.NODE_ENV === 'production',
	cookies: {
		sessionToken: {
			name: `__Secure-next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
			},
		},
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.name = token.name as string | undefined;
				session.user.role = token.role as 'user' | 'admin';
			}
			return session;
		},
	},
	pages: {
		signIn: '/auth/signin',
		error: '/auth/signin', // Redirect to signin page on errors
	},
};

export default NextAuth(authOptions);
