import { FastifyPluginAsync } from 'fastify';
import Task from '@/models/Task';
import { AnthropicClaudeProvider } from '@/lib/llm/anthropic';
import { ValidationErrorHandler, ApiErrorHandler } from '@/lib/errors/handlers';
import { validateTaskInput } from '@/middleware/validation';
import { rateLimit } from '@/middleware/rateLimit';
import { logRequest } from '@/lib/monitoring/logger';
import { CreateTaskRequest, GetTaskRequest, UpdateTaskRequest, DeleteTaskRequest, TaskResponse } from '@/types/task';

const llm = new AnthropicClaudeProvider();
const errorHandlers = [new ValidationErrorHandler(), new ApiErrorHandler()];

const isError = (error: unknown): error is Error => {
	return error instanceof Error;
};

const TaskRoutes: FastifyPluginAsync = async (fastify) => {
	// Apply rate limiting to all task routes
	fastify.addHook('onRequest', rateLimit('tasks', 100));

	// Create new task with AI analysis
	fastify.post<CreateTaskRequest>('/', { preHandler: validateTaskInput }, async (request, reply) => {
		try {
			logRequest(request);

			const taskData = request.body;
			const analysis = await llm.analyzeContent(taskData.description);

			const task = await Task.create({
				...taskData,
				metadata: {
					sentiment: analysis.sentiment,
					keywords: analysis.keywords,
					language: analysis.language,
				},
			});

			const response: TaskResponse = {
				id: task._id.toString(),
				title: task.title,
				description: task.description,
				dueDate: task.dueDate,
				priority: task.priority || 'medium',
				tags: task.tags || [],
				metadata: task.metadata,
				createdAt: task.createdAt,
				updatedAt: task.updatedAt,
			};

			return reply.code(201).send(response);
		} catch (error) {
			if (isError(error)) {
				const handler = errorHandlers.find((h) => h.canHandle(error));
				if (handler) {
					await handler.handle(error);
					return reply.code(handler.getResponse(error).status).send(handler.getResponse(error).body);
				}
			}
			return reply.code(500).send({ error: 'Internal server error' });
		}
	});

	// Get all tasks with AI-optimized summaries
	fastify.get('/', async (request, reply) => {
		try {
			logRequest(request);

			const tasks = await Task.find();
			const optimizedTasks = await Promise.all(
				tasks.map(async (task) => {
					const optimizedDescription = await llm.optimizeContent(task.description);
					return {
						id: task._id.toString(),
						title: task.title,
						description: task.description,
						optimizedDescription,
						dueDate: task.dueDate,
						priority: task.priority || 'medium',
						tags: task.tags || [],
						createdAt: task.createdAt,
						updatedAt: task.updatedAt,
					};
				})
			);

			return reply.send(optimizedTasks);
		} catch (error) {
			if (isError(error)) {
				const handler = errorHandlers.find((h) => h.canHandle(error));
				if (handler) {
					await handler.handle(error);
					return reply.code(handler.getResponse(error).status).send(handler.getResponse(error).body);
				}
			}
			return reply.code(500).send({ error: 'Internal server error' });
		}
	});

	// Get single task with AI analysis
	fastify.get<GetTaskRequest>('/:id', async (request, reply) => {
		try {
			logRequest(request);

			const task = await Task.findById(request.params.id);
			if (!task) {
				return reply.code(404).send({ error: 'Task not found' });
			}

			const analysis = await llm.analyzeContent(task.description);
			const response: TaskResponse = {
				id: task._id.toString(),
				title: task.title,
				description: task.description,
				dueDate: task.dueDate,
				priority: task.priority || 'medium',
				tags: task.tags || [],
				metadata: {
					sentiment: analysis.sentiment,
					keywords: analysis.keywords,
					language: analysis.language,
				},
				createdAt: task.createdAt,
				updatedAt: task.updatedAt,
			};

			return reply.send(response);
		} catch (error) {
			if (isError(error)) {
				const handler = errorHandlers.find((h) => h.canHandle(error));
				if (handler) {
					await handler.handle(error);
					return reply.code(handler.getResponse(error).status).send(handler.getResponse(error).body);
				}
			}
			return reply.code(500).send({ error: 'Internal server error' });
		}
	});

	// Update task with AI validation
	fastify.put<UpdateTaskRequest>('/:id', { preHandler: validateTaskInput }, async (request, reply) => {
		try {
			logRequest(request);

			const task = await Task.findByIdAndUpdate(request.params.id, request.body, { new: true });

			if (!task) {
				return reply.code(404).send({ error: 'Task not found' });
			}

			// Validate update with AI
			const validation = await llm.analyzeContent(task.description);
			if (validation.toxicity > 0.7) {
				return reply.code(400).send({
					error: 'Content contains potentially harmful language',
					details: validation,
				});
			}

			const response: TaskResponse = {
				id: task._id.toString(),
				title: task.title,
				description: task.description,
				dueDate: task.dueDate,
				priority: task.priority || 'medium',
				tags: task.tags || [],
				metadata: task.metadata,
				createdAt: task.createdAt,
				updatedAt: task.updatedAt,
			};

			return reply.send(response);
		} catch (error) {
			if (isError(error)) {
				const handler = errorHandlers.find((h) => h.canHandle(error));
				if (handler) {
					await handler.handle(error);
					return reply.code(handler.getResponse(error).status).send(handler.getResponse(error).body);
				}
			}
			return reply.code(500).send({ error: 'Internal server error' });
		}
	});

	// Delete task
	fastify.delete<DeleteTaskRequest>('/:id', async (request, reply) => {
		try {
			logRequest(request);

			const task = await Task.findByIdAndDelete(request.params.id);
			if (!task) {
				return reply.code(404).send({ error: 'Task not found' });
			}
			return reply.send({ message: 'Task deleted successfully' });
		} catch (error) {
			if (isError(error)) {
				const handler = errorHandlers.find((h) => h.canHandle(error));
				if (handler) {
					await handler.handle(error);
					return reply.code(handler.getResponse(error).status).send(handler.getResponse(error).body);
				}
			}
			return reply.code(500).send({ error: 'Internal server error' });
		}
	});
};

export default TaskRoutes;
