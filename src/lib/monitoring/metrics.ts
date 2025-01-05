import { MetricsConfig } from './config';
import { MetricPoint } from './types';
import { Redis } from 'ioredis';

interface RedisMetricData {
    value: string;
    timestamp: string;
    tags: string;
}

export class MetricsCollector {
    private redis: Redis;
    private config: MetricsConfig;
    private batch: MetricPoint[] = [];
    private timer: NodeJS.Timeout;

    constructor(redis: Redis, config: MetricsConfig) {
        this.redis = redis;
        this.config = config;
        this.timer = setInterval(() => this.flush(), config.interval);
    }

    async record(metric: MetricPoint): Promise<void> {
        this.batch.push(metric);
        if (this.batch.length >= this.config.batchSize) {
            await this.flush();
        }
    }

    async flush(): Promise<void> {
        if (this.batch.length === 0) return;
        
        const pipeline = this.redis.pipeline();
        const now = Date.now();
        const retentionCutoff = now - this.config.retention * 24 * 60 * 60 * 1000;

        // Store metrics and clean up old data
        this.batch.forEach(metric => {
            const key = `metrics:${metric.name}:${metric.timestamp}`;
            pipeline.hmset(key, metric.tags);
            pipeline.expire(key, this.config.retention * 24 * 60 * 60);
        });

        // Clean up old metrics
        pipeline.zremrangebyscore('metrics:timestamps', '-inf', retentionCutoff);

        await pipeline.exec();
        this.batch = [];
    }

    async getMetrics(name: string, start: number, end: number): Promise<MetricPoint[]> {
        const keys = await this.redis.zrangebyscore(
            'metrics:timestamps',
            start,
            end
        );

        const pipeline = this.redis.pipeline();
        keys.forEach(key => pipeline.hgetall(key));
        const results = await pipeline.exec();

        if (!results) return [];
        
        return results.map(([err, data]) => {
            if (err || !data) {
                console.error('Error retrieving metric:', err);
                return null;
            }
            
            try {
                const metricData = data as RedisMetricData;
                return {
                    name,
                    value: parseFloat(metricData.value),
                    timestamp: parseInt(metricData.timestamp),
                    tags: JSON.parse(metricData.tags)
                };
            } catch (error) {
                console.error('Error parsing metric data:', error);
                return null;
            }
        }).filter(Boolean) as MetricPoint[];
    }

    async getSummary(name: string, period: number): Promise<{
        count: number;
        average: number;
        min: number;
        max: number;
    }> {
        const now = Date.now();
        const metrics = await this.getMetrics(name, now - period, now);
        
        if (metrics.length === 0) {
            return { count: 0, average: 0, min: 0, max: 0 };
        }

        const values = metrics.map(m => m.value);
        const sum = values.reduce((a, b) => a + b, 0);
        
        return {
            count: metrics.length,
            average: sum / metrics.length,
            min: Math.min(...values),
            max: Math.max(...values)
        };
    }

    shutdown(): void {
        clearInterval(this.timer);
        this.flush().catch(err => {
            console.error('Error during final metrics flush:', err);
        });
    }
}

export const createMetricsCollector = (redis: Redis, config: MetricsConfig) => {
    return new MetricsCollector(redis, config);
};