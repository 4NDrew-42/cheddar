/// <reference path="../../types/lib.d.ts" />
import { serviceRegistry } from '../integration/registry';
import { eventSystem } from '../integration/events';

type ServiceEvent = {
  serviceName: string;
  error?: Error;
};

export class HealthMonitor {
  private status: HealthStatus = {
    status: 'unhealthy',
    services: {}
  };

  constructor() {
    // Subscribe to service events
    eventSystem.subscribe('service:start', this.handleServiceStart.bind(this));
    eventSystem.subscribe('service:stop', this.handleServiceStop.bind(this));
    eventSystem.subscribe('service:error', this.handleServiceError.bind(this));
  }

  /**
   * Get current health status
   */
  getStatus(): HealthStatus {
    return this.status;
  }

  /**
   * Perform health check on all services
   */
  async checkHealth(): Promise<HealthStatus> {
    const services = Array.from(serviceRegistry.getServices());
    const checks = services.map(async (entry) => {
      try {
        // TODO: Implement service-specific health checks
        this.status.services[entry.instance.constructor.name] = {
          status: 'up',
          lastCheck: Date.now()
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        this.status.services[entry.instance.constructor.name] = {
          status: 'down',
          lastCheck: Date.now(),
          error: errorMessage
        };
      }
    });

    await Promise.all(checks);
    this.updateOverallStatus();
    return this.status;
  }

  private updateOverallStatus(): void {
    const allUp = Object.values(this.status.services).every(
      (service) => service.status === 'up'
    );

    const anyDown = Object.values(this.status.services).some(
      (service) => service.status === 'down'
    );

    this.status.status = allUp ? 'healthy' : anyDown ? 'unhealthy' : 'degraded';
  }

  private handleServiceStart(serviceName: string): void {
    this.status.services[serviceName] = {
      status: 'up',
      lastCheck: Date.now()
    };
    this.updateOverallStatus();
  }

  private handleServiceStop(serviceName: string): void {
    this.status.services[serviceName] = {
      status: 'down',
      lastCheck: Date.now(),
      error: 'Service stopped'
    };
    this.updateOverallStatus();
  }

  private handleServiceError({ serviceName, error }: { serviceName: string; error: Error }): void {
    this.status.services[serviceName] = {
      status: 'down',
      lastCheck: Date.now(),
      error: error.message
    };
    this.updateOverallStatus();
  }
}

export const healthMonitor = new HealthMonitor();