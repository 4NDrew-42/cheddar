import { MetricsCollector } from './metrics';
import os from 'os';
import { Redis } from 'ioredis';

export class MetricCollectors {
    private metrics: MetricsCollector;
    private redis: Redis;

    constructor(metrics: MetricsCollector, redis: Redis) {
        this.metrics = metrics;
        this.redis = redis;
    }

    async collectRequestMetrics(): Promise<void> {
        // Track request counts
        await this.metrics.record({
            name: 'request.count',
            value: 1,
            timestamp: Date.now(),
            tags: {}
        });
    }

    async collectResponseTime(duration: number): Promise<void> {
        // Track response times
        await this.metrics.record({
            name: 'response.time',
            value: duration,
            timestamp: Date.now(),
            tags: {}
        });
    }

    async collectErrorRate(): Promise<void> {
        // Track error rates
        await this.metrics.record({
            name: 'error.rate',
            value: 1,
            timestamp: Date.now(),
            tags: {}
        });
    }

    async collectQueueLength(queueName: string): Promise<void> {
        // Track queue lengths
        const length = await this.redis.llen(queueName);
        await this.metrics.record({
            name: 'queue.length',
            value: length,
            timestamp: Date.now(),
            tags: { queue: queueName }
        });
    }

    async collectMemoryUsage(): Promise<void> {
        // Track memory usage
        const memoryUsage = process.memoryUsage();
        await this.metrics.record({
            name: 'memory.usage',
            value: memoryUsage.rss / 1024 / 1024, // in MB
            timestamp: Date.now(),
            tags: {}
        });
    }

    async collectRedisConnections(): Promise<void> {
        // Track Redis connections
        const clientList = await this.redis.client('LIST');
        const connectionCount = clientList.split('\n').length;
        await this.metrics.record({
            name: 'redis.connections',
            value: connectionCount,
            timestamp: Date.now(),
            tags: {}
        });
    }

    async collectTaskCompletionRate(): Promise<void> {
        // Track task completion rates
        await this.metrics.record({
            name: 'task.completion',
            value: 1,
            timestamp: Date.now(),
            tags: {}
        });
    }

    async collectSystemMetrics(): Promise<void> {
        // Collect system-level metrics
        const load = os.loadavg();
        await this.metrics.record({
            name: 'system.load',
            value: load[0],
            timestamp: Date.now(),
            tags: {}
        });

        const freeMemory = os.freemem() / 1024 / 1024; // in MB
        await this.metrics.record({
            name: 'system.memory.free',
            value: freeMemory,
            timestamp: Date.now(),
            tags: {}
        });
    }
}