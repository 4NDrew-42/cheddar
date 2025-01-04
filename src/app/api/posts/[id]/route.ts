import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../../lib/mongo';
import Post from '../../../../models/Post';

// Using Response instead of NextResponse for better type compatibility
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession();
        if (!session?.user?.id) {
            return Response.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();
        const body = await request.json();

        const updatedPost = await Post.findOneAndUpdate(
            { _id: params.id, userId: session.user.id },
            body,
            { new: true }
        );

        if (!updatedPost) {
            return Response.json(
                { message: 'Post not found' },
                { status: 404 }
            );
        }

        return Response.json(updatedPost);
    } catch (error) {
        console.error('API Error:', error);
        return Response.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession();
        if (!session?.user?.id) {
            return Response.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const deletedPost = await Post.findOneAndDelete({
            _id: params.id,
            userId: session.user.id,
        });

        if (!deletedPost) {
            return Response.json(
                { message: 'Post not found' },
                { status: 404 }
            );
        }

        return new Response(null, { status: 204 });
    } catch (error) {
        console.error('API Error:', error);
        return Response.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
