import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../lib/mongo';
import Post from '../../../models/Post';
import {
    RouteHandler,
    createApiResponse,
    createErrorResponse,
    validatePostInput,
} from '../../../types/api';

export const GET: RouteHandler = async (request: NextRequest) => {
    try {
        const session = await getServerSession();
        if (!session?.user?.id) {
            return createErrorResponse('Unauthorized', undefined, 401);
        }

        await dbConnect();

        // Parse pagination parameters
        const searchParams = request.nextUrl.searchParams;
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10')));
        const skip = (page - 1) * limit;

        // Get total count for pagination
        const total = await Post.countDocuments({ userId: session.user.id });

        // Get paginated posts
        const posts = await Post.find({ userId: session.user.id })
            .sort({ date: 1 })
            .skip(skip)
            .limit(limit);

        return createApiResponse({
            posts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            }
        });
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

export const POST: RouteHandler = async (request: NextRequest) => {
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

        const newPost = await Post.create({
            ...validation.data,
            userId: session.user.id,
        });

        return createApiResponse(newPost, 'Post created successfully', 201);
    } catch (error) {
        console.error('API Error:', error);
        if (error instanceof Error && error.name === 'ValidationError') {
            return createErrorResponse(
                'Validation error',
                [{
                    code: 'VALIDATION_ERROR',
                    message: error.message
                }],
                400
            );
        }
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