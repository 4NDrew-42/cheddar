declare module 'lib/mongo' {
  import { Mongoose } from 'mongoose';
  function dbConnect(): Promise<Mongoose>;
  export default dbConnect;
}

interface ServiceDefinition {
  name: string;
  version: string;
  dependencies: string[];
  initialize(config: any): Promise<any>;
  validate(config: any): boolean;
}

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  services: Record<string, {
    status: 'up' | 'down';
    lastCheck: number;
    error?: string;
  }>;
}

interface ServiceManager {
  initialize(): Promise<void>;
  getService<T>(name: string): T;
  healthCheck(): Promise<HealthStatus>;
  shutdown(): Promise<void>;
}