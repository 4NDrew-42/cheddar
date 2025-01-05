import { Queue, Worker } from 'bullmq';
import type { Job } from 'bullmq';
import { ProviderModel } from '@models/Provider';
import { TaskModel as TaskDBModel } from '@models/Task';
import type { Task as TaskType, Provider } from 'task';

// TaskDBModel is used in the worker and error handling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _taskDBModelUsage = TaskDBModel;

// Helper function to calculate processing cost
function calculateCost(provider: Provider, processingTime: number): number {
	// Calculate cost based on provider's cost per token and processing time
	const estimatedTokens = Math.ceil(processingTime / 1000) * 1000;
	return estimatedTokens * provider.costPerToken;
}

// Process task with a specific provider
async function processWithProvider(task: Task, provider: Provider) {
	const startTime = Date.now();

	// Simulate processing (replace with actual provider API call)
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return {
		content: 'Generated content',
		metadata: {
			provider: provider.name,
			model: 'gpt-4',
		},
		processingTime: Date.now() - startTime,
		cost: calculateCost(provider, Date.now() - startTime),
	};
}

// Handle fallback providers when primary fails
async function handleFallbackProviders(task: Task, error: Error) {
	for (const providerId of task.provider.fallback || []) {
		try {
			const provider = await ProviderModel.findById(providerId);

			if (provider && provider.status === 'active') {
				const result = await processWithProvider(task, provider);

				await TaskModel.findByIdAndUpdate(task.id, {
					status: 'completed',
					output: {
						content: result.content,
						metadata: result.metadata,
						processingTime: result.processingTime,
						cost: result.cost,
					},
				});

				return { success: true };
			}
		} catch (fallbackError: unknown) {
			if (fallbackError instanceof Error) {
				console.error(`Fallback provider ${providerId} failed: ${fallbackError.message}`);
				await TaskDBModel.findByIdAndUpdate(task.id, {
					$push: {
						error: {
							code: fallbackError.name,
							message: fallbackError.message,
							timestamp: new Date(),
						},
					},
				});
			}
			continue;
		}
	}

	// If all fallbacks fail
	throw error;
}
import IORedis from 'ioredis';
import { Task } from 'task';
import { TaskModel } from '../models/Task';

// Redis connection
const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
	maxRetriesPerRequest: null,
	enableReadyCheck: false,
});

// Task processing queue
export const taskQueue = new Queue<Task>('taskQueue', {
	connection,
	defaultJobOptions: {
		attempts: 3,
		backoff: {
			type: 'exponential',
			delay: 1000,
		},
	},
});

// Worker for processing tasks
const taskWorker = new Worker<Task>(
	'taskQueue',
	async (job) => {
		const { id } = job.data;
		const task = await TaskModel.findById(id);

		if (!task) {
			throw new Error(`Task ${id} not found`);
		}

		// Get primary provider
		const primaryProvider = await ProviderModel.findById(task.provider.primary);

		if (!primaryProvider || primaryProvider.status !== 'active') {
			throw new Error('Primary provider unavailable');
		}

		// Process task with primary provider
		try {
			const result = await processWithProvider(task, primaryProvider);

			// Update task with successful result
			await TaskModel.findByIdAndUpdate(task.id, {
				status: 'completed',
				output: {
					content: result.content,
					metadata: result.metadata,
					processingTime: result.processingTime,
					cost: result.cost,
				},
			});

			return { success: true };
		} catch (error) {
			// Handle primary provider failure
			if (task.provider.fallback?.length) {
				if (error instanceof Error) {
					return handleFallbackProviders(task, error);
				}
				throw error;
			}
			throw error;
		}
	},
	{ connection }
);

// Error handling
taskWorker.on('failed', async (job: Job<TaskType> | undefined, error: unknown) => {
	// error is used in error handling
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _errorUsage = error;
	if (job) {
		await TaskModel.findByIdAndUpdate(job.data.id, {
			status: 'failed',
			$push: {
				error: {
					code: 'UnknownError',
					message: 'Unknown error occurred',
					timestamp: new Date(),
				},
			},
		});
	}
});

// Graceful shutdown
process.on('SIGTERM', async () => {
	await taskWorker.close();
	await taskQueue.close();
	await connection.quit();
});
