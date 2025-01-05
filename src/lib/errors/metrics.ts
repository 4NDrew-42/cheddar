import { 
    RecoveryMetrics,
    ErrorContext,
    ErrorFeatures
} from './types';

export class ErrorMetricsCollector {
    private metrics: RecoveryMetrics[] = [];
    private errorCounts: Map<string, number> = new Map();
    private recoveryRates: Map<string, number> = new Map();
    private performanceStats: PerformanceStats = {
        averageDuration: 0,
        successRate: 0,
        resourceUsage: {
            cpu: 0,
            memory: 0,
            network: 0
        }
    };

    recordMetrics(metrics: RecoveryMetrics): void {
        this.metrics.push(metrics);
        this.updateErrorCounts(metrics);
        this.updateRecoveryRates(metrics);
        this.updatePerformanceStats(metrics);
    }

    getErrorTrends(): ErrorTrend[] {
        const trends: ErrorTrend[] = [];
        
        for (const [errorType, count] of this.errorCounts.entries()) {
            trends.push({
                errorType,
                count,
                recoveryRate: this.recoveryRates.get(errorType) || 0
            });
        }

        return trends.sort((a, b) => b.count - a.count);
    }

    getPerformanceStats(): PerformanceStats {
        return this.performanceStats;
    }

    private updateErrorCounts(metrics: RecoveryMetrics): void {
        const errorType = metrics.context.errorFeatures.errorType || 'unknown';
        const count = this.errorCounts.get(errorType) || 0;
        this.errorCounts.set(errorType, count + 1);
    }

    private updateRecoveryRates(metrics: RecoveryMetrics): void {
        const errorType = metrics.context?.errorType || 'unknown';
        const total = this.errorCounts.get(errorType) || 1;
        const successCount = this.metrics
            .filter(m => m.success && m.context?.errorType === errorType)
            .length;

        this.recoveryRates.set(errorType, successCount / total);
    }

    private updatePerformanceStats(metrics: RecoveryMetrics): void {
        const totalMetrics = this.metrics.length;
        
        // Update average duration
        this.performanceStats.averageDuration = 
            (this.performanceStats.averageDuration * (totalMetrics - 1) + 
             metrics.duration) / totalMetrics;

        // Update success rate
        this.performanceStats.successRate = 
            this.metrics.filter(m => m.success).length / totalMetrics;

        // Update resource usage
        this.performanceStats.resourceUsage.cpu = 
            (this.performanceStats.resourceUsage.cpu * (totalMetrics - 1) + 
             metrics.resourceUsage.cpu) / totalMetrics;

        this.performanceStats.resourceUsage.memory = 
            (this.performanceStats.resourceUsage.memory * (totalMetrics - 1) + 
             metrics.resourceUsage.memory) / totalMetrics;

        this.performanceStats.resourceUsage.network = 
            (this.performanceStats.resourceUsage.network * (totalMetrics - 1) + 
             metrics.resourceUsage.network) / totalMetrics;
    }
}

interface PerformanceStats {
    averageDuration: number;
    successRate: number;
    resourceUsage: {
        cpu: number;
        memory: number;
        network: number;
    };
}

interface ErrorTrend {
    errorType: string;
    count: number;
    recoveryRate: number;
}