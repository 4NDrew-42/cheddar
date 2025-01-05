import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { POST as signup } from './route';

// Mock NextAuth
jest.mock('next-auth', () => ({
	__esModule: true,
	default: jest.fn(),
	getServerSession: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
	useSession: jest.fn(() => ({
		data: null,
		status: 'unauthenticated',
	})),
	signIn: jest.fn(),
	signOut: jest.fn(),
}));

// Mock rate limit
import { Request, Response, NextFunction } from 'express';
jest.mock('express-rate-limit', () => () => (req: Request, res: Response, next: NextFunction) => next());

// Mock MongoDB and User model
jest.mock('mongodb', () => ({
	MongoClient: {
		connect: jest.fn(),
	},
	ObjectId: jest.fn().mockImplementation((id) => id),
}));

jest.mock('../../../../models/User', () => ({
	findOne: jest.fn(),
	create: jest.fn(),
}));

import UserModel from '../../../../models/User';

describe('POST /api/auth/signup', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should create a new user', async () => {
		const req = new NextRequest('http://localhost/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: 'test@example.com',
				password: 'password123',
			}),
		});

		// Set up UserModel mock implementations
		jest.mocked(UserModel.findOne).mockResolvedValue(null);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		jest.mocked(UserModel.create).mockResolvedValue([
			{
				_id: new ObjectId('123'),
				email: 'test@example.com',
				password: expect.any(String),
				role: 'user',
				createdAt: expect.any(Date),
			},
		] as any);

		const response = await signup(req, {
			params: {},
			searchParams: {},
		});
		const data = await response.json();

		expect(response.status).toBe(201);
		expect(data).toMatchObject({
			data: {
				userId: expect.any(String),
				email: 'test@example.com',
			},
			message: 'User created successfully',
			timestamp: expect.any(String),
		});
		expect(UserModel.create).toHaveBeenCalledWith({
			email: 'test@example.com',
			password: expect.any(String),
			role: 'user',
			createdAt: expect.any(Date),
		});
	});

	it('should return 409 if user already exists', async () => {
		const req = new NextRequest('http://localhost/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: 'existing@example.com',
				password: 'password123',
			}),
		});

		// Set up UserModel mock implementations for existing user case
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		jest.mocked(UserModel.findOne).mockResolvedValue({
			_id: new ObjectId('existing123'),
			email: 'existing@example.com',
			password: 'hashedpassword',
			role: 'user',
			createdAt: new Date(),
		} as any as any);

		const response = await signup(req, {
			params: {},
			searchParams: {},
		});
		const data = await response.json();

		expect(response.status).toBe(409);
		expect(data).toEqual({
			message: 'User already exists',
			errors: [
				{
					code: 'USER_EXISTS',
					message: 'A user with this email already exists',
					field: 'email',
				},
			],
			timestamp: expect.any(String),
		});
	});

	it('should return 400 for invalid input', async () => {
		const req = new NextRequest('http://localhost/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: 'invalid-email',
				password: '123', // too short
			}),
		});

		const response = await signup(req, {
			params: {},
			searchParams: {},
		});
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data).toMatchObject({
			message: 'Validation failed',
			errors: expect.arrayContaining([
				expect.objectContaining({
					code: 'VALIDATION_ERROR',
					field: expect.any(String),
					message: expect.any(String),
				}),
			]),
			timestamp: expect.any(String),
		});
	});
});
