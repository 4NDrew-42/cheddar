import Fastify, { FastifyInstance } from 'fastify';
import TaskRoutes from '../app/api/tasks/route';
import ProviderRoutes from '../app/api/providers/route';
import { connectToDatabase } from './mongo';

export async function createServer(): Promise<FastifyInstance> {
	const server: FastifyInstance = Fastify({
		logger: true,
	});

	// Connect to database
	await connectToDatabase();

	// Register routes
	server.register(TaskRoutes);
	server.register(ProviderRoutes);

	return server;
}

export async function stopServer(server: FastifyInstance): Promise<void> {
	await server.close();
}
