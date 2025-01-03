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

	switch (req.method) {
		case 'GET': {
			const posts = await Post.find({ userId: session.user.id });
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
			return res.status(405).end();
	}
}
