// Core error types and interfaces
export class AppError extends Error {
	code: string;
	status: number;
	message: string;
	details?: Record<string, string | number | boolean | null>;
	retryable: boolean;

	constructor(code: string, status: number, message: string, retryable: boolean, details?: Record<string, string | number | boolean | null>) {
		super(message);
		this.code = code;
		this.status = status;
		this.message = message;
		this.retryable = retryable;
		this.details = details;
	}
}

export interface ErrorResponse<T = unknown> {
	status: number;
	body: {
		code: string;
		message: string;
		requestId?: string;
		details?: T;
		help?: {
			url: string;
			description: string;
			contact?: {
				email: string;
				phone?: string;
			};
		};
		recovery?: Array<{
			step: string;
			action: string;
			retryable: boolean;
		}>;
	};
}

export interface ErrorHandler<T = unknown> {
	canHandle(error: Error): boolean;
	handle(error: Error): Promise<void>;
	getResponse(error: Error): ErrorResponse<T>;
}

// Specific error types
export class ValidationError extends AppError {
	constructor(message: string, details: Record<string, string | number | boolean | null>) {
		super('VALIDATION_ERROR', 400, message, false, details);
	}
}

export class ApiError extends Error implements AppError {
	code = 'API_ERROR';
	status = 502;
	retryable = true;

	constructor(message: string) {
		super(message);
	}
}

export class SystemError extends Error implements AppError {
	code = 'SYSTEM_ERROR';
	status = 500;
	retryable = false;

	constructor(message: string) {
		super(message);
	}
}

export class NetworkError extends Error implements AppError {
	code = 'NETWORK_ERROR';
	status = 503;
	retryable = true;

	constructor(message: string) {
		super(message);
	}
}

export class AuthenticationError extends Error implements AppError {
	code = 'AUTHENTICATION_ERROR';
	status = 401;
	retryable = false;

	constructor(message: string) {
		super(message);
	}
}

export interface ErrorContext {
    timestamp: number;
    service: string;
    environment: string;
    trace: {
        id: string;
        path: string[];
        root: string;
    };
    user?: {
        id: string;
        role: string;
        region: string;
    };
    request?: {
        id: string;
        method: string;
        path: string;
        headers: Record<string, string>;
        body?: unknown;
    };
    performance: {
        duration: number;
        memory: number;
        cpu: number;
    };
    system: {
        load: number;
        connections: number;
        queues: Record<string, number>;
    };
}

export interface ErrorFeatures {
    errorType: string;
    errorMessage: string;
    stackTrace: string[];
    contextFeatures: {
        timeOfDay: number;
        dayOfWeek: number;
        systemLoad: number;
        userFactors: number[];
        serviceMetrics: number[];
    };
    historicalPatterns: {
        frequency: number;
        recoveryRate: number;
        avgResolutionTime: number;
        impactScore: number;
    };
}

export interface RecoveryPrediction {
    strategies: Array<{
        name: string;
        confidence: number;
        expectedDuration: number;
        resourceCost: number;
        successProbability: number;
    }>;
    fallbacks: string[];
    escalation: {
        threshold: number;
        target: string;
    };
}

export interface EnhancedErrorHandler<T extends Error = Error> extends ErrorHandler<T> {
    priority: number;
    canHandle(error: Error): error is T;
    extractFeatures(error: T, context: ErrorContext): Promise<ErrorFeatures>;
    predictRecovery(features: ErrorFeatures): Promise<RecoveryPrediction>;
    executeRecovery(prediction: RecoveryPrediction): Promise<void>;
    recordOutcome(success: boolean, metrics: RecoveryMetrics): Promise<void>;
}

export interface CircuitBreaker {
    name: string;
    failureThreshold: number;
    recoveryTime: number;
    halfOpenRequests: number;
    monitoredOperations: Set<string>;
    currentState: {
        status: 'open' | 'closed' | 'half-open';
        failures: number;
        lastFailure: number;
        successStreak: number;
    };
}

export interface BulkheadConfig {
    maxConcurrent: number;
    maxQueued: number;
    timeout: number;
    priorities: {
        [key: string]: number;
    };
}

export interface RetryStrategy {
    maxAttempts: number;
    backoffType: 'exponential' | 'linear' | 'fibonacci';
    initialDelay: number;
    maxDelay: number;
    jitter: boolean;
    onRetry: (attempt: number, error: Error) => Promise<void>;
}

export interface RecoveryMetrics {
    duration: number;
    resourceUsage: {
        cpu: number;
        memory: number;
        network: number;
    };
    success: boolean;
    impact: {
        usersAffected: number;
        revenueImpact: number;
        systemImpact: number;
    };
    cost: {
        computeCost: number;
        humanCost: number;
        opportunityCost: number;
    };
    context: {
        errorContext: ErrorContext;
        errorFeatures: ErrorFeatures;
    };
}
