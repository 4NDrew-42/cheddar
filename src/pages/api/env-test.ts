// src/pages/api/env-test.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json({
		MONGODB_URI: process.env.MONGODB_URI ? 'Loaded' : 'Not Loaded',
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Loaded' : 'Not Loaded',
		NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'Loaded' : 'Not Loaded',
		NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL ? 'Loaded' : 'Not Loaded',
	});
}
