declare module 'task' {
	interface Task {
		id: string;
		type: 'copy' | 'image' | 'review';
		priority: 1 | 2 | 3;
		status: 'pending' | 'processing' | 'completed' | 'failed';
		input: {
			prompt: string;
			context?: string;
			requirements?: string[];
			maxTokens?: number;
			temperature?: number;
		};
		output?: {
			content: string;
			metadata: Record<string, unknown>;
			processingTime: number;
			cost: number;
		};
		provider: {
			primary: string;
			fallback?: string[];
		};
		createdAt: Date;
		updatedAt: Date;
		attempts: number;
		error?: {
			code: string;
			message: string;
			timestamp: Date;
		}[];
	}

	interface Provider {
		id: string;
		name: string;
		capabilities: string[];
		maxTokens: number;
		costPerToken: number;
		rateLimit: {
			requests: number;
			window: number;
		};
		timeout: number;
		status: 'active' | 'degraded' | 'inactive';
		reliability: number;
	}
}
