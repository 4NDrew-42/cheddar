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
		const { id } = req.query;

		switch (req.method) {
			case 'PUT': {
				const updatedPost = await Post.findOneAndUpdate({ _id: id, userId: session.user.id }, req.body, { new: true });
				if (!updatedPost) {
					return res.status(404).json({ message: 'Post not found' });
				}
				return res.status(200).json(updatedPost);
			}
			case 'DELETE': {
				const deletedPost = await Post.findOneAndDelete({
					_id: id,
					userId: session.user.id,
				});
				if (!deletedPost) {
					return res.status(404).json({ message: 'Post not found' });
				}
				return res.status(204).end();
			}
			default:
				return res.status(405).json({ message: 'Method not allowed' });
		}
	} catch (error) {
		console.error('API Error:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
}
