import { NextRequest } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../../lib/mongo';
import UserModel from '../../../../models/User';
import {
    RouteHandler,
    createApiResponse,
    createErrorResponse,
    ValidateBody,
} from '../../../../types/api';

// Input validation schema
const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignupInput = z.infer<typeof signupSchema>;

// Validation function using our ValidateBody type
const validateSignupInput: ValidateBody<SignupInput> = (body: unknown) => {
    const result = signupSchema.safeParse(body);
    if (!result.success) {
        return {
            valid: false,
            errors: result.error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            })),
        };
    }
    return {
        valid: true,
        data: result.data,
    };
};

export const POST: RouteHandler = async (request: NextRequest) => {
    try {
        const body = await request.json();

        // Validate input
        const validation = validateSignupInput(body);
        if (!validation.valid || !validation.data) {
            return createErrorResponse(
                'Validation failed',
                validation.errors?.map(err => ({
                    code: 'VALIDATION_ERROR',
                    message: err.message,
                    field: err.field,
                }))
            );
        }

        const { email, password } = validation.data;

        // Connect to database
        await dbConnect();

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return createErrorResponse(
                'User already exists',
                [{
                    code: 'USER_EXISTS',
                    message: 'A user with this email already exists',
                    field: 'email',
                }],
                409
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await UserModel.create({
            email,
            password: hashedPassword,
            role: 'user',
            createdAt: new Date(),
        });

        return createApiResponse(
            {
                userId: user._id.toString(),
                email: user.email,
            },
            'User created successfully',
            201
        );
    } catch (error) {
        console.error('Signup error:', error);
        return createErrorResponse(
            'Internal server error',
            [{
                code: 'INTERNAL_ERROR',
                message: 'An unexpected error occurred during signup',
            }],
            500
        );
    }
};
