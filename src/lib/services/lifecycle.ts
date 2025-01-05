/// <reference path="../../types/lib.d.ts" />
import { serviceRegistry } from '../integration/registry';
import { healthMonitor } from './health';
import { eventSystem } from '../integration/events';

export class LifecycleManager {
  private services: Map<string, ServiceDefinition> = new Map();
  private startupOrder: string[] = [];
  private shutdownOrder: string[] = [];

  constructor() {
    eventSystem.subscribe('service:registered', this.handleServiceRegistered.bind(this));
  }

  /**
   * Register a service with the lifecycle manager
   * @param service Service definition
   */
  registerService(service: ServiceDefinition): void {
    this.services.set(service.name, service);
    this.updateDependencyGraph();
  }

  /**
   * Start all services in dependency order
   */
  async startServices(): Promise<void> {
    for (const serviceName of this.startupOrder) {
      const service = this.services.get(serviceName);
      if (!service) continue;

      try {
        await service.initialize(serviceRegistry.getService(serviceName));
        healthMonitor.handleServiceStart(serviceName);
      } catch (error) {
        healthMonitor.handleServiceError({ serviceName, error });
        throw new Error(`Failed to start service ${serviceName}: ${error.message}`);
      }
    }
  }

  /**
   * Stop all services in reverse dependency order
   */
  async stopServices(): Promise<void> {
    for (const serviceName of this.shutdownOrder) {
      const service = this.services.get(serviceName);
      if (!service) continue;

      try {
        // TODO: Implement service-specific shutdown logic
        healthMonitor.handleServiceStop(serviceName);
      } catch (error) {
        healthMonitor.handleServiceError({ serviceName, error });
      }
    }
  }

  private handleServiceRegistered(serviceName: string): void {
    this.updateDependencyGraph();
  }

  private updateDependencyGraph(): void {
    // TODO: Implement topological sort for dependency resolution
    this.startupOrder = Array.from(this.services.keys());
    this.shutdownOrder = [...this.startupOrder].reverse();
  }
}

export const lifecycleManager = new LifecycleManager();