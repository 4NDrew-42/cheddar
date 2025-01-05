export interface MetricPoint {
    name: string;
    value: number;
    timestamp: number;
    tags: Record<string, string>;
}

export interface LogEntry {
    level: 'debug' | 'info' | 'warn' | 'error';
    message: string;
    timestamp: number;
    context?: Record<string, any>;
}