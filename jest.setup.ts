import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { NextAuthOptions } from 'next-auth';
import { mockDeep } from 'jest-mock-extended';

declare global {
  function mockNextAuth(options?: Partial<NextAuthOptions>): ReturnType<typeof mockDeep<NextAuthOptions>>;
}

// Mock NextAuth
jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn(),
  getServerSession: jest.fn(),
}));

// MongoDB setup
let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  process.env.MONGODB_URI = uri;
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

afterEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

// Global mocks
global.mockNextAuth = (options: Partial<NextAuthOptions> = {}) => {
  const mockSession = mockDeep<NextAuthOptions>();
  jest.spyOn(require('next-auth'), 'getServerSession').mockResolvedValue({
    user: {
      name: 'Test User',
      email: 'test@example.com',
    },
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    ...options,
  });
  return mockSession;
};