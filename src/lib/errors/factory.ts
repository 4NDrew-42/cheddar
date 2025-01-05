import { 
    ErrorContext, 
    ErrorFeatures, 
    RecoveryPrediction, 
    EnhancedErrorHandler, 
    CircuitBreaker, 
    BulkheadConfig, 
    RetryStrategy,
    RecoveryMetrics
} from './types';

export class ErrorHandlerFactory {
    private handlers: EnhancedErrorHandler[] = [];
    private circuitBreakers: Map<string, CircuitBreaker> = new Map();
    private bulkheads: Map<string, BulkheadConfig> = new Map();
    private retryStrategies: Map<string, RetryStrategy> = new Map();
    private metrics: RecoveryMetrics[] = [];

    constructor() {
        this.registerDefaultHandlers();
    }

    private registerDefaultHandlers() {
        // Register system default handlers
        this.registerHandler(new SystemErrorHandler());
        this.registerHandler(new NetworkErrorHandler());
        this.registerHandler(new ValidationErrorHandler());
    }

    registerHandler(handler: EnhancedErrorHandler) {
        this.handlers.push(handler);
        this.handlers.sort((a, b) => b.priority - a.priority);
    }

    registerCircuitBreaker(name: string, config: CircuitBreaker) {
        this.circuitBreakers.set(name, config);
    }

    registerBulkhead(name: string, config: BulkheadConfig) {
        this.bulkheads.set(name, config);
    }

    registerRetryStrategy(name: string, strategy: RetryStrategy) {
        this.retryStrategies.set(name, strategy);
    }

    async handleError(error: Error, context: ErrorContext): Promise<void> {
        const handler = this.findHandlerForError(error);
        if (!handler) {
            throw new Error(`No handler found for error: ${error.message}`);
        }

        try {
            const features = await handler.extractFeatures(error, context);
            const prediction = await handler.predictRecovery(features);
            await this.executeRecovery(handler, prediction, context);
        } catch (recoveryError) {
            await handler.recordOutcome(false, this.createFailureMetrics(context));
            throw recoveryError;
        }
    }

    private findHandlerForError(error: Error): EnhancedErrorHandler | undefined {
        return this.handlers.find(handler => handler.canHandle(error));
    }

    private async executeRecovery(
        handler: EnhancedErrorHandler,
        prediction: RecoveryPrediction,
        context: ErrorContext
    ): Promise<void> {
        const startTime = Date.now();
        let success = false;

        try {
            await handler.executeRecovery(prediction);
            success = true;
        } finally {
            const metrics = this.createMetrics(context, startTime, success);
            await handler.recordOutcome(success, metrics);
            this.metrics.push(metrics);
        }
    }

    private createMetrics(context: ErrorContext, startTime: number, success: boolean): RecoveryMetrics {
        const duration = Date.now() - startTime;
        return {
            duration,
            resourceUsage: {
                cpu: context.performance.cpu,
                memory: context.performance.memory,
                network: 0 // Will be updated by network monitoring
            },
            success,
            impact: {
                usersAffected: context.user ? 1 : 0,
                revenueImpact: 0, // Will be updated by business metrics
                systemImpact: context.system.load
            },
            cost: {
                computeCost: duration * 0.0001, // Example cost calculation
                humanCost: 0, // Will be updated by support metrics
                opportunityCost: 0 // Will be updated by business metrics
            },
            context: {
                errorContext: context,
                errorFeatures: {
                    errorType: '',
                    errorMessage: '',
                    stackTrace: [],
                    contextFeatures: {
                        timeOfDay: new Date(context.timestamp).getHours(),
                        dayOfWeek: new Date(context.timestamp).getDay(),
                        systemLoad: context.system.load,
                        userFactors: [],
                        serviceMetrics: []
                    },
                    historicalPatterns: {
                        frequency: 0,
                        recoveryRate: 0,
                        avgResolutionTime: 0,
                        impactScore: 0
                    }
                }
            }
        };
    }

    private createFailureMetrics(context: ErrorContext): RecoveryMetrics {
        return {
            duration: 0,
            resourceUsage: {
                cpu: context.performance.cpu,
                memory: context.performance.memory,
                network: 0
            },
            success: false,
            impact: {
                usersAffected: context.user ? 1 : 0,
                revenueImpact: 0,
                systemImpact: context.system.load
            },
            cost: {
                computeCost: 0,
                humanCost: 0,
                opportunityCost: 0
            },
            context: {
                errorContext: context,
                errorFeatures: {
                    errorType: '',
                    errorMessage: '',
                    stackTrace: [],
                    contextFeatures: {
                        timeOfDay: new Date(context.timestamp).getHours(),
                        dayOfWeek: new Date(context.timestamp).getDay(),
                        systemLoad: context.system.load,
                        userFactors: [],
                        serviceMetrics: []
                    },
                    historicalPatterns: {
                        frequency: 0,
                        recoveryRate: 0,
                        avgResolutionTime: 0,
                        impactScore: 0
                    }
                }
            }
        };
    }

    getMetrics(): RecoveryMetrics[] {
        return [...this.metrics];
    }
}

// Default handler implementations
class SystemErrorHandler implements EnhancedErrorHandler<Error> {
    priority = 100;
    
    canHandle(error: Error): error is Error {
        return error.name === 'SystemError';
    }

    async handle(error: Error): Promise<void> {
        const context = this.createDefaultContext();
        const features = await this.extractFeatures(error, context);
        const prediction = await this.predictRecovery(features);
        await this.executeRecovery(prediction);
    }

    getResponse(error: Error) {
        return {
            status: 500,
            body: {
                code: 'SYSTEM_ERROR',
                message: error.message,
                recovery: []
            }
        };
    }

    async extractFeatures(error: Error, context: ErrorContext): Promise<ErrorFeatures> {
        return {
            errorType: error.name,
            errorMessage: error.message,
            stackTrace: error.stack?.split('\n') || [],
            contextFeatures: {
                timeOfDay: new Date(context.timestamp).getHours(),
                dayOfWeek: new Date(context.timestamp).getDay(),
                systemLoad: context.system.load,
                userFactors: [],
                serviceMetrics: []
            },
            historicalPatterns: {
                frequency: 0,
                recoveryRate: 0,
                avgResolutionTime: 0,
                impactScore: 0
            }
        };
    }

    async predictRecovery(_features: ErrorFeatures): Promise<RecoveryPrediction> {
        return {
            strategies: [{
                name: 'restart_service',
                confidence: 0.8,
                expectedDuration: 5000,
                resourceCost: 0.5,
                successProbability: 0.9
            }],
            fallbacks: ['manual_intervention'],
            escalation: {
                threshold: 3,
                target: 'operations_team'
            }
        };
    }

    async executeRecovery(_prediction: RecoveryPrediction): Promise<void> {
        // Implementation would go here
    }

    async recordOutcome(_success: boolean, _metrics: RecoveryMetrics): Promise<void> {
        // Implementation would go here
    }

    private createDefaultContext(): ErrorContext {
        return {
            timestamp: Date.now(),
            service: 'unknown',
            environment: 'production',
            trace: {
                id: 'unknown',
                path: [],
                root: 'unknown'
            },
            performance: {
                duration: 0,
                memory: 0,
                cpu: 0
            },
            system: {
                load: 0,
                connections: 0,
                queues: {}
            }
        };
    }
}

class NetworkErrorHandler implements EnhancedErrorHandler<Error> {
    priority = 90;
    
    canHandle(error: Error): error is Error {
        return error.name === 'NetworkError';
    }

    async handle(error: Error): Promise<void> {
        const context = this.createDefaultContext();
        const features = await this.extractFeatures(error, context);
        const prediction = await this.predictRecovery(features);
        await this.executeRecovery(prediction);
    }

    getResponse(error: Error) {
        return {
            status: 503,
            body: {
                code: 'NETWORK_ERROR',
                message: error.message,
                recovery: []
            }
        };
    }

    async extractFeatures(error: Error, context: ErrorContext): Promise<ErrorFeatures> {
        return {
            errorType: error.name,
            errorMessage: error.message,
            stackTrace: error.stack?.split('\n') || [],
            contextFeatures: {
                timeOfDay: new Date(context.timestamp).getHours(),
                dayOfWeek: new Date(context.timestamp).getDay(),
                systemLoad: context.system.load,
                userFactors: [],
                serviceMetrics: []
            },
            historicalPatterns: {
                frequency: 0,
                recoveryRate: 0,
                avgResolutionTime: 0,
                impactScore: 0
            }
        };
    }

    async predictRecovery(features: ErrorFeatures): Promise<RecoveryPrediction> {
        return {
            strategies: [{
                name: 'retry_connection',
                confidence: 0.9,
                expectedDuration: 1000,
                resourceCost: 0.1,
                successProbability: 0.95
            }],
            fallbacks: ['switch_endpoint'],
            escalation: {
                threshold: 3,
                target: 'network_team'
            }
        };
    }

    async executeRecovery(_prediction: RecoveryPrediction): Promise<void> {
        // Implementation would go here
    }

    async recordOutcome(_success: boolean, _metrics: RecoveryMetrics): Promise<void> {
        // Implementation would go here
    }

    private createDefaultContext(): ErrorContext {
        return {
            timestamp: Date.now(),
            service: 'unknown',
            environment: 'production',
            trace: {
                id: 'unknown',
                path: [],
                root: 'unknown'
            },
            performance: {
                duration: 0,
                memory: 0,
                cpu: 0
            },
            system: {
                load: 0,
                connections: 0,
                queues: {}
            }
        };
    }
}

class ValidationErrorHandler implements EnhancedErrorHandler<Error> {
    priority = 80;
    
    canHandle(error: Error): error is Error {
        return error.name === 'ValidationError';
    }

    async handle(error: Error): Promise<void> {
        const context = this.createDefaultContext();
        const features = await this.extractFeatures(error, context);
        const prediction = await this.predictRecovery(features);
        await this.executeRecovery(prediction);
    }

    getResponse(error: Error) {
        return {
            status: 400,
            body: {
                code: 'VALIDATION_ERROR',
                message: error.message,
                recovery: []
            }
        };
    }

    async extractFeatures(error: Error, context: ErrorContext): Promise<ErrorFeatures> {
        return {
            errorType: error.name,
            errorMessage: error.message,
            stackTrace: error.stack?.split('\n') || [],
            contextFeatures: {
                timeOfDay: new Date(context.timestamp).getHours(),
                dayOfWeek: new Date(context.timestamp).getDay(),
                systemLoad: context.system.load,
                userFactors: [],
                serviceMetrics: []
            },
            historicalPatterns: {
                frequency: 0,
                recoveryRate: 0,
                avgResolutionTime: 0,
                impactScore: 0
            }
        };
    }

    async predictRecovery(features: ErrorFeatures): Promise<RecoveryPrediction> {
        return {
            strategies: [{
                name: 'validate_input',
                confidence: 1.0,
                expectedDuration: 100,
                resourceCost: 0.01,
                successProbability: 1.0
            }],
            fallbacks: ['manual_validation'],
            escalation: {
                threshold: 1,
                target: 'support_team'
            }
        };
    }

    async executeRecovery(_prediction: RecoveryPrediction): Promise<void> {
        // Implementation would go here
    }

    async recordOutcome(_success: boolean, _metrics: RecoveryMetrics): Promise<void> {
        // Implementation would go here
    }

    private createDefaultContext(): ErrorContext {
        return {
            timestamp: Date.now(),
            service: 'unknown',
            environment: 'production',
            trace: {
                id: 'unknown',
                path: [],
                root: 'unknown'
            },
            performance: {
                duration: 0,
                memory: 0,
                cpu: 0
            },
            system: {
                load: 0,
                connections: 0,
                queues: {}
            }
        };
    }
}