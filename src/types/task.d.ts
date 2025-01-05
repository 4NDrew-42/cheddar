import { RouteGenericInterface } from 'fastify';

interface TaskBase {
	title: string;
	description: string;
	dueDate?: Date;
	priority?: 'low' | 'medium' | 'high';
	tags?: string[];
}

interface TaskResponse extends TaskBase {
	id: string;
	metadata?: {
		sentiment: 'positive' | 'negative' | 'neutral';
		keywords: string[];
		language: string;
	};
	createdAt?: Date;
	updatedAt?: Date;
}

interface CreateTaskRequest extends RouteGenericInterface {
	Body: TaskBase;
}

interface GetTaskRequest extends RouteGenericInterface {
	Params: {
		id: string;
	};
}

interface UpdateTaskRequest extends RouteGenericInterface {
	Params: {
		id: string;
	};
	Body: Partial<TaskBase>;
}

interface DeleteTaskRequest extends RouteGenericInterface {
	Params: {
		id: string;
	};
}

export type { TaskBase, TaskResponse, CreateTaskRequest, GetTaskRequest, UpdateTaskRequest, DeleteTaskRequest };
