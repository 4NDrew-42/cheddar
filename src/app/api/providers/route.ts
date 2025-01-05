import { FastifyPluginAsync } from 'fastify';
import Provider from '../../../models/Provider';

interface Params {
	id: string;
}

const ProviderRoutes: FastifyPluginAsync = async (fastify) => {
	// Create new provider
	fastify.post('/', async (request, reply) => {
		try {
			const provider = await Provider.create(request.body);
			return reply.code(201).send(provider);
		} catch (error: unknown) {
			if (error instanceof Error) {
				fastify.log.error(error);
			}
			return reply.code(500).send({ error: 'Failed to create provider' });
		}
	});

	// Get all providers
	fastify.get('/', async (request, reply) => {
		try {
			const providers = await Provider.find();
			return reply.send(providers);
		} catch (error: unknown) {
			if (error instanceof Error) {
				fastify.log.error(error);
			}
			return reply.code(500).send({ error: 'Failed to fetch providers' });
		}
	});

	// Get single provider
	fastify.get<{ Params: Params }>('/:id', async (request, reply) => {
		try {
			const provider = await Provider.findById(request.params.id);
			if (!provider) {
				return reply.code(404).send({ error: 'Provider not found' });
			}
			return reply.send(provider);
		} catch (error: unknown) {
			if (error instanceof Error) {
				fastify.log.error(error);
			}
			return reply.code(500).send({ error: 'Failed to fetch provider' });
		}
	});

	// Update provider
	fastify.put<{ Params: Params; Body: Partial<IProvider> }>('/:id', async (request, reply) => {
		try {
			const provider = await Provider.findByIdAndUpdate(request.params.id, request.body, { new: true });
			if (!provider) {
				return reply.code(404).send({ error: 'Provider not found' });
			}
			return reply.send(provider);
		} catch (error: unknown) {
			if (error instanceof Error) {
				fastify.log.error(error);
			}
			return reply.code(500).send({ error: 'Failed to update provider' });
		}
	});

	// Delete provider
	fastify.delete<{ Params: Params }>('/:id', async (request, reply) => {
		try {
			const provider = await Provider.findByIdAndDelete(request.params.id);
			if (!provider) {
				return reply.code(404).send({ error: 'Provider not found' });
			}
			return reply.send({ message: 'Provider deleted successfully' });
		} catch (error: unknown) {
			if (error instanceof Error) {
				fastify.log.error(error);
			}
			return reply.code(500).send({ error: 'Failed to delete provider' });
		}
	});
};

export default ProviderRoutes;
