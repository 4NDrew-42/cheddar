import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json({
		MONGODB_URI: process.env.MONGODB_URI ? 'Loaded' : 'Not Loaded',
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Loaded' : 'Not Loaded',
		NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'Loaded' : 'Not Loaded',
		NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL ? 'Loaded' : 'Not Loaded',
	});
}