import { ErrorHandler, ErrorResponse, AppError } from './types';

export class ValidationErrorHandler implements ErrorHandler {
	canHandle(error: Error): boolean {
		return error.name === 'ValidationError';
	}

	async handle(error: AppError): Promise<void> {
		// Log validation errors with details
		console.error('Validation Error:', {
			message: error.message,
			details: error.details,
			timestamp: new Date().toISOString(),
			stack: error.stack,
		});
	}

	getResponse(error: AppError): ErrorResponse {
		return {
			status: error.status,
			body: {
				code: error.code,
				message: error.message,
				...(error.details && { details: error.details }),
				help: {
					url: 'https://example.com/validation-help',
					description: 'Validation error documentation',
					contact: {
						email: 'support@example.com',
					},
				},
				recovery: [
					{
						step: 'Check input data',
						action: 'Review and correct the provided data',
						retryable: true,
					},
				],
			},
		};
	}
}

export class ApiErrorHandler implements ErrorHandler {
	canHandle(error: Error): boolean {
		return error.name === 'ApiError';
	}

	async handle(error: AppError): Promise<void> {
		console.error('API Error:', {
			message: error.message,
			timestamp: new Date().toISOString(),
			stack: error.stack,
		});
	}

	getResponse(error: AppError): ErrorResponse {
		return {
			status: error.status,
			body: {
				code: error.code,
				message: error.message,
				help: {
					url: 'https://example.com/api-help',
					description: 'API error documentation',
				},
				recovery: [
					{
						step: 'Retry request',
						action: 'Wait and try the request again',
						retryable: true,
					},
				],
			},
		};
	}
}
