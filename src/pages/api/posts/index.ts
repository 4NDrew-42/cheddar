import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../../../lib/mongo';
import Post from '../../../models/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const session = await getSession({ req });
		if (!session?.user?.id) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		await dbConnect();

		switch (req.method) {
			case 'GET': {
				const posts = await Post.find({ userId: session.user.id }).sort({ date: 1 });
				return res.status(200).json(posts);
			}
			case 'POST': {
				const newPost = await Post.create({
					...req.body,
					userId: session.user.id,
				});
				return res.status(201).json(newPost);
			}
			default:
				return res.status(405).json({ message: 'Method not allowed' });
		}
	} catch (error) {
		console.error('API Error:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}
