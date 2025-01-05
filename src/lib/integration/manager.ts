import { serviceRegistry } from './registry';
import type { ServiceManager, HealthStatus } from '../types/lib.d.ts';

export class ServiceManagerImpl implements ServiceManager {
  private healthStatus: HealthStatus = {
    status: 'unhealthy',
    services: {}
  };

  async initialize(): Promise<void> {
    try {
      await serviceRegistry.initialize();
      this.healthStatus.status = 'healthy';
    } catch (error) {
      this.healthStatus.status = 'unhealthy';
      throw error;
    }
  }

  getService<T>(name: string): T {
    return serviceRegistry.getService<T>(name);
  }

  async healthCheck(): Promise<HealthStatus> {
    // TODO: Implement detailed service health checks
    return this.healthStatus;
  }

  async shutdown(): Promise<void> {
    try {
      await serviceRegistry.shutdown();
      this.healthStatus.status = 'unhealthy';
    } catch (error) {
      this.healthStatus.status = 'degraded';
      throw error;
    }
  }
}

export const serviceManager = new ServiceManagerImpl();