import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../lib/mongo';
import Post from '../../../models/Post';

export async function GET() {
	try {
		const session = await getServerSession();
		if (!session?.user?.id) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		await dbConnect();

		const posts = await Post.find({ userId: session.user.id }).sort({ date: 1 });
		return NextResponse.json(posts);
	} catch (error) {
		console.error('API Error:', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession();
		if (!session?.user?.id) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		await dbConnect();
		const body = await request.json();

		const newPost = await Post.create({
			...body,
			userId: session.user.id,
		});

		return NextResponse.json(newPost, { status: 201 });
	} catch (error) {
		console.error('API Error:', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}