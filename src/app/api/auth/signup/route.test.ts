import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { POST as signup } from './route';

// Mock rate limit
jest.mock('express-rate-limit', () => () => (req: any, res: any, next: any) => next());

// Mock MongoDB and User model
jest.mock('mongodb', () => ({
	MongoClient: {
		connect: jest.fn(),
	},
	ObjectId: jest.fn().mockImplementation((id) => id),
}));

jest.mock('../../../../models/User', () => ({
	findOne: jest.fn(),
	create: jest.fn()
}));

import UserModel from '../../../../models/User';

describe('POST /api/auth/signup', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should create a new user', async () => {
		const req = new Request('http://localhost/api/auth/signup', {
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
		jest.mocked(UserModel.create).mockResolvedValue({
			_id: new ObjectId('123'),
			email: 'test@example.com',
			password: expect.any(String),
			role: 'user',
			createdAt: expect.any(Date)
		} as any);

		const response = await signup(req);
		const data = await response.json();

		expect(response.status).toBe(201);
		expect(data).toMatchObject({
			message: 'User created',
			userId: expect.any(String),
		});
		expect(UserModel.create).toHaveBeenCalledWith({
			email: 'test@example.com',
			password: expect.any(String),
			role: 'user',
			createdAt: expect.any(Date),
		});
	});

	it('should return 400 if user already exists', async () => {
		const req = new Request('http://localhost/api/auth/signup', {
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
		jest.mocked(UserModel.findOne).mockResolvedValue({
			_id: new ObjectId('existing123'),
			email: 'existing@example.com',
			password: 'hashedpassword',
			role: 'user',
			createdAt: new Date()
		} as any);

		const response = await signup(req);
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data).toEqual({
			message: 'User already exists',
		});
	});
});
