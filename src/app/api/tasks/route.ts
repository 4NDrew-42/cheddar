import { FastifyPluginAsync } from 'fastify';
import { Task } from '../../models/Task';

const TaskRoutes: FastifyPluginAsync = async (fastify) => {
	// Create new task
	fastify.post('/', async (request, reply) => {
		try {
			const task = await Task.create(request.body);
			return reply.code(201).send(task);
		} catch (error) {
			return reply.code(500).send({ error: 'Failed to create task' });
		}
	});

	// Get all tasks
	fastify.get('/', async (request, reply) => {
		try {
			const tasks = await Task.find();
			return reply.send(tasks);
		} catch (error) {
			return reply.code(500).send({ error: 'Failed to fetch tasks' });
		}
	});

	// Get single task
	fastify.get('/:id', async (request, reply) => {
		try {
			const task = await Task.findById(request.params.id);
			if (!task) {
				return reply.code(404).send({ error: 'Task not found' });
			}
			return reply.send(task);
		} catch (error) {
			return reply.code(500).send({ error: 'Failed to fetch task' });
		}
	});

	// Update task
	fastify.put('/:id', async (request, reply) => {
		try {
			const task = await Task.findByIdAndUpdate(request.params.id, request.body, { new: true });
			if (!task) {
				return reply.code(404).send({ error: 'Task not found' });
			}
			return reply.send(task);
		} catch (error) {
			return reply.code(500).send({ error: 'Failed to update task' });
		}
	});

	// Delete task
	fastify.delete('/:id', async (request, reply) => {
		try {
			const task = await Task.findByIdAndDelete(request.params.id);
			if (!task) {
				return reply.code(404).send({ error: 'Task not found' });
			}
			return reply.send({ message: 'Task deleted successfully' });
		} catch (error) {
			return reply.code(500).send({ error: 'Failed to delete task' });
		}
	});
};

export default TaskRoutes;
