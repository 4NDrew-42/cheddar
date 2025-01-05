import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../../lib/mongo';
import Post from '../../../../models/Post';
import {
    RouteHandler,
    PostParams,
    createApiResponse,
    createErrorResponse,
    validatePostInput,
} from '../../../../types/api';

export const PUT: RouteHandler<PostParams> = async (
    request: NextRequest,
    context
) => {
    try {
        const session = await getServerSession();
        if (!session?.user?.id) {
            return createErrorResponse('Unauthorized', undefined, 401);
        }

        await dbConnect();
        const body = await request.json();

        // Validate request body
        const validation = validatePostInput(body);
        if (!validation.valid || !validation.data) {
            return createErrorResponse(
                'Invalid request body',
                validation.errors?.map(err => ({
                    code: 'VALIDATION_ERROR',
                    message: err.message,
                    field: err.field
                }))
            );
        }

        const updatedPost = await Post.findOneAndUpdate(
            { _id: context.params.id, userId: session.user.id },
            validation.data,
            { new: true }
        );

        if (!updatedPost) {
            return createErrorResponse('Post not found', undefined, 404);
        }

        return createApiResponse(updatedPost);
    } catch (error) {
        console.error('API Error:', error);
        return createErrorResponse(
            'Internal server error',
            [{
                code: 'INTERNAL_ERROR',
                message: 'An unexpected error occurred'
            }],
            500
        );
    }
};

export const DELETE: RouteHandler<PostParams> = async (
    _request: NextRequest,
    context
) => {
    try {
        const session = await getServerSession();
        if (!session?.user?.id) {
            return createErrorResponse('Unauthorized', undefined, 401);
        }

        await dbConnect();

        const deletedPost = await Post.findOneAndDelete({
            _id: context.params.id,
            userId: session.user.id,
        });

        if (!deletedPost) {
            return createErrorResponse('Post not found', undefined, 404);
        }

        return new Response(null, { status: 204 });
    } catch (error) {
        console.error('API Error:', error);
        return createErrorResponse(
            'Internal server error',
            [{
                code: 'INTERNAL_ERROR',
                message: 'An unexpected error occurred'
            }],
            500
        );
    }
};

// Add GET method for completeness
export const GET: RouteHandler<PostParams> = async (
    _request: NextRequest,
    context
) => {
    try {
        const session = await getServerSession();
        if (!session?.user?.id) {
            return createErrorResponse('Unauthorized', undefined, 401);
        }

        await dbConnect();

        const post = await Post.findOne({
            _id: context.params.id,
            userId: session.user.id,
        });

        if (!post) {
            return createErrorResponse('Post not found', undefined, 404);
        }

        return createApiResponse(post);
    } catch (error) {
        console.error('API Error:', error);
        return createErrorResponse(
            'Internal server error',
            [{
                code: 'INTERNAL_ERROR',
                message: 'An unexpected error occurred'
            }],
            500
        );
    }
};
