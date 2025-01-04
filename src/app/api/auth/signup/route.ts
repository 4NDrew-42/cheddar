import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../../lib/mongo';
import UserModel from '../../../../models/User';

// Input validation schema
const signupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export async function POST(req: Request) {
	try {
		const body = await req.json();

		// Validate input
		const result = signupSchema.safeParse(body);
		if (!result.success) {
			return NextResponse.json(
				{
					message: 'Validation failed',
					errors: result.error.errors,
				},
				{ status: 400 }
			);
		}

		const { email, password } = result.data;

		// Connect to database
		await dbConnect();

		// Check if user already exists
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return NextResponse.json({ message: 'User already exists' }, { status: 400 });
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

		return NextResponse.json(
			{
				message: 'User created',
				userId: user._id.toString(),
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Signup error:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
