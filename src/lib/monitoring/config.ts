export interface MetricsConfig {
    enabled: boolean;
    interval: number; // in milliseconds
    retention: number; // in days
    batchSize: number;
}

export const defaultMetricsConfig: MetricsConfig = {
    enabled: true,
    interval: 10000, // 10 seconds
    retention: 30, // 30 days
    batchSize: 100
};