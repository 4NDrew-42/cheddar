import NextAuth, { NextAuthOptions, DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
		} & DefaultSession['user'];
	}

	interface User {
		id: string;
		email: string;
	}
}

const uri = process.env.MONGODB_URI;
if (!uri) {
	throw new Error('Please define the MONGODB_URI environment variable');
}

const clientPromise = MongoClient.connect(uri);

export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Email and password are required');
				}

				const user = await User.findOne({ email: credentials.email });
				if (!user) {
					throw new Error('User not found');
				}

				const isValid = await bcrypt.compare(credentials.password, user.password);
				if (!isValid) {
					throw new Error('Invalid password');
				}

				return { id: user._id.toString(), email: user.email };
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
};

export default NextAuth(authOptions);
