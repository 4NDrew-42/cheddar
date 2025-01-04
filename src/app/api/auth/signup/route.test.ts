import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { POST as signup } from './route';

// Mock rate limit
jest.mock('express-rate-limit', () => () => (req: any, res: any, next: any) => next());

// Mock MongoDB
jest.mock('mongodb', () => ({
  MongoClient: {
    connect: jest.fn(),
  },
  ObjectId: jest.fn().mockImplementation((id) => id),
}));

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

    // Mock MongoDB collection methods
    const mockFindOne = jest.fn().mockResolvedValue(null);
    const mockInsertOne = jest.fn().mockResolvedValue({
      acknowledged: true,
      insertedId: new ObjectId('123'),
    });

    (MongoClient.connect as jest.Mock).mockResolvedValue({
      db: () => ({
        collection: jest.fn().mockReturnValue({
          findOne: mockFindOne,
          insertOne: mockInsertOne,
        }),
      }),
      close: jest.fn(),
    });

    const response = await signup(req);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toEqual({
      message: 'User created',
      userId: '123',
    });
    expect(mockInsertOne).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: expect.any(String),
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

    // Mock existing user
    const mockFindOne = jest.fn().mockResolvedValue({
      email: 'existing@example.com',
    });

    (MongoClient.connect as jest.Mock).mockResolvedValue({
      db: () => ({
        collection: jest.fn().mockReturnValue({
          findOne: mockFindOne,
          insertOne: jest.fn(),
        }),
      }),
      close: jest.fn(),
    });

    const response = await signup(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      message: 'User already exists',
    });
  });
});