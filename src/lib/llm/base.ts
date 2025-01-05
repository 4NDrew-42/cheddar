import { ILLMProvider, AnalysisResult, LLMError, LLMConfig } from './types';

interface APIError extends Error {
	response?: {
		json: () => Promise<{
			error?: { message?: string };
			message?: string;
		}>;
	};
	code?: string;
	details?: unknown;
}

function isAPIError(error: unknown): error is APIError {
	return error instanceof Error && (error as APIError).response !== undefined;
}

export abstract class BaseLLMProvider implements ILLMProvider {
	protected config: LLMConfig;

	constructor(config: LLMConfig = {}) {
		this.config = {
			maxRetries: 3,
			timeout: 30000,
			temperature: 0.7,
			maxTokens: 2048,
			...config,
		};
	}

	protected async retryOperation<T>(operation: () => Promise<T>, retryCount = 0): Promise<T> {
		try {
			return (await Promise.race([operation(), new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Operation timed out')), this.config.timeout))])) as T;
		} catch (error) {
			if (retryCount < (this.config.maxRetries || 3)) {
				const delay = Math.pow(2, retryCount) * 1000;
				await new Promise((resolve) => setTimeout(resolve, delay));
				return this.retryOperation(operation, retryCount + 1);
			}
			throw error;
		}
	}

	abstract generateContent(prompt: string): Promise<string>;
	abstract analyzeContent(content: string): Promise<AnalysisResult>;
	abstract optimizeContent(content: string): Promise<string>;

	protected async handleError(error: unknown, provider: string): Promise<never> {
		if (!(error instanceof Error)) {
			throw new LLMError('An unknown error occurred', provider, 'UNKNOWN_ERROR');
		}
		if (error instanceof LLMError) {
			throw error;
		}

		// Extract error message from API response
		let apiError = error.message;

		if (isAPIError(error)) {
			try {
				const response = await error.response?.json();
				apiError = response?.error?.message || response?.message || error.message;
			} catch {
				// If JSON parsing fails, use the original error message
			}
		}

		throw new LLMError(apiError || 'An error occurred while processing the request', provider, isAPIError(error) ? error.code : undefined, isAPIError(error) ? error.details : undefined);
	}
}
