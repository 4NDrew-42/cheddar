declare module '@/models/Task' {
	import { Document, Model } from 'mongoose';

	interface ITask {
		title: string;
		description: string;
		dueDate?: Date;
		priority?: 'low' | 'medium' | 'high';
		tags?: string[];
		metadata?: {
			sentiment: 'positive' | 'negative' | 'neutral';
			keywords: string[];
			language: string;
		};
		createdAt?: Date;
		updatedAt?: Date;
	}

	interface TaskDocument extends ITask, Document {
		_id: string;
	}

	interface TaskModel extends Model<TaskDocument> {
		create(task: ITask): Promise<TaskDocument>;
		findById(id: string): Promise<TaskDocument | null>;
		findByIdAndUpdate(id: string, update: Partial<ITask>, options: { new: boolean }): Promise<TaskDocument | null>;
		findByIdAndDelete(id: string): Promise<TaskDocument | null>;
		find(): Promise<TaskDocument[]>;
	}

	const Task: TaskModel;
	export default Task;
}

declare module '@/lib/llm/anthropic' {
	class AnthropicClaudeProvider {
		analyzeContent(content: string): Promise<{
			sentiment: 'positive' | 'negative' | 'neutral';
			keywords: string[];
			language: string;
			toxicity: number;
		}>;
		optimizeContent(content: string): Promise<string>;
	}
	export { AnthropicClaudeProvider };
}

declare module '@/lib/errors/handlers' {
	interface ErrorResponse {
		status: number;
		body: Record<string, unknown>;
	}

	interface ErrorHandler {
		canHandle(error: Error): boolean;
		handle(error: Error): Promise<void>;
		getResponse(error: Error): ErrorResponse;
	}

	export class ValidationErrorHandler implements ErrorHandler {
		canHandle(error: Error): boolean;
		handle(error: Error): Promise<void>;
		getResponse(error: Error): ErrorResponse;
	}

	export class ApiErrorHandler implements ErrorHandler {
		canHandle(error: Error): boolean;
		handle(error: Error): Promise<void>;
		getResponse(error: Error): ErrorResponse;
	}
}

declare module '@/middleware/validation' {
	import { FastifyMiddleware } from 'fastify';

	const validateTaskInput: FastifyMiddleware;
	export { validateTaskInput };
}

declare module '@/middleware/rateLimit' {
	import { FastifyMiddleware } from 'fastify';

	const rateLimit: (scope: string, limit: number) => FastifyMiddleware;
	export { rateLimit };
}

declare module '@/lib/monitoring/logger' {
	import { FastifyRequest } from 'fastify';

	const logRequest: (request: FastifyRequest) => void;
	export { logRequest };
}
