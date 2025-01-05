import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createServer, stopServer } from '../../src/lib/server';
import Task from '../../src/models/Task';
import Provider from '../../src/models/Provider';
import type { FastifyInstance } from 'fastify';

describe('API Integration Tests', () => {
	let mongoServer: MongoMemoryServer;
	let server: any;

	beforeAll(async () => {
		mongoServer = await MongoMemoryServer.create();
		process.env.MONGO_URI = mongoServer.getUri();
		server = await createServer();
	});

	afterAll(async () => {
		await server.stop();
		await mongoServer.stop();
	});

	describe('Task API', () => {
		it('should create a new task', async () => {
			const taskData = {
				title: 'Test Task',
				description: 'Test Description',
				dueDate: new Date(),
				priority: 'high',
			};

			const response = await server.inject({
				method: 'POST',
				url: '/api/tasks',
				payload: taskData,
			});

			expect(response.statusCode).toBe(201);
			expect(response.json()).toHaveProperty('id');
		});

		it('should get all tasks', async () => {
			await Task.create({
				title: 'Test Task 1',
				description: 'Test Description 1',
				dueDate: new Date(),
				priority: 'medium',
			});

			const response = await server.inject({
				method: 'GET',
				url: '/api/tasks',
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toBeInstanceOf(Array);
			expect(response.json().length).toBeGreaterThan(0);
		});
	});

	describe('Provider API', () => {
		it('should create a new provider', async () => {
			const providerData = {
				name: 'Test Provider',
				type: 'Test Type',
				config: {},
			};

			const response = await server.inject({
				method: 'POST',
				url: '/api/providers',
				payload: providerData,
			});

			expect(response.statusCode).toBe(201);
			expect(response.json()).toHaveProperty('id');
		});

		it('should get all providers', async () => {
			await Provider.create({
				name: 'Test Provider 1',
				type: 'Test Type 1',
				config: {},
			});

			const response = await server.inject({
				method: 'GET',
				url: '/api/providers',
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toBeInstanceOf(Array);
			expect(response.json().length).toBeGreaterThan(0);
		});
	});
});
