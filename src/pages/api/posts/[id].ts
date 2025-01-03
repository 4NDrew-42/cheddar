import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../../../lib/mongo';
import Post from '../../../models/Post';
import { Session } from 'next-auth';

interface UserSession extends Session {
	user: {
		id?: string;
		email: string;
	};
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = (await getSession({ req })) as UserSession;
	if (!session?.user?.id) return res.status(401).json({ message: 'Unauthorized' });

	await dbConnect();
	const { id } = req.query;

	switch (req.method) {
		case 'PUT': {
			const updatedPost = await Post.findOneAndUpdate({ _id: id, userId: session.user.id }, req.body, { new: true });
			return res.status(200).json(updatedPost);
		}
		case 'DELETE': {
			await Post.findOneAndDelete({ _id: id, userId: session.user.id });
			return res.status(204).end();
		}
		default:
			return res.status(405).end();
	}
}
