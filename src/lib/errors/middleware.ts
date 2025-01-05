import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, AppError } from './types';
import { ValidationErrorHandler, ApiErrorHandler } from './handlers';

const errorHandlers = [new ValidationErrorHandler(), new ApiErrorHandler()];

export function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
	const handler = errorHandlers.find((h) => h.canHandle(error));

	if (handler) {
		handler.handle(error as AppError).catch((err) => {
			console.error('Error handling failed:', err);
		});

		const response = handler.getResponse(error as AppError);
		res.status(response.status).json(response.body);
	} else {
		// Default error handler
		const response: ErrorResponse = {
			status: 500,
			body: {
				code: 'INTERNAL_ERROR',
				message: 'An unexpected error occurred',
			},
		};
		res.status(response.status).json(response.body);
	}
}

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
	const response: ErrorResponse = {
		status: 404,
		body: {
			code: 'NOT_FOUND',
			message: 'Resource not found',
		},
	};
	res.status(response.status).json(response.body);
}

export function errorPageMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
	const response: ErrorResponse = {
		status: 500,
		body: {
			code: 'PAGE_ERROR',
			message: 'An error occurred while rendering the page',
		},
	};

	if (process.env.NODE_ENV === 'development') {
		response.body.details = {
			message: error.message,
			stack: error.stack,
		};
	}

	res.status(response.status).json(response.body);
}
