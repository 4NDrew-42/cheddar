import { serviceRegistry } from '../integration/registry';
import { configManager } from '../integration/config';
/// <reference path="../../types/lib.d.ts" />

export class ServiceInitializer {
  private initializedServices: Set<string> = new Set();

  /**
   * Register and initialize a service
   * @param service Service definition
   * @param config Service configuration
   */
  async registerAndInitialize(service: ServiceDefinition, config: any): Promise<void> {
    if (!configManager.validate(service.name, config)) {
      throw new Error(`Invalid configuration for service ${service.name}`);
    }

    // Check dependencies
    for (const dep of service.dependencies) {
      if (!this.initializedServices.has(dep)) {
        throw new Error(`Dependency ${dep} not initialized for service ${service.name}`);
      }
    }

    // Initialize the service
    const instance = await service.initialize(config);
    serviceRegistry.register(service.name, service.version, instance, service.dependencies);
    this.initializedServices.add(service.name);
  }

  /**
   * Get initialization status of services
   * @returns Map of service names to initialization status
   */
  getInitializationStatus(): Record<string, boolean> {
    const status: Record<string, boolean> = {};
    this.initializedServices.forEach(serviceName => {
      status[serviceName] = true;
    });
    return status;
  }
}

export const serviceInitializer = new ServiceInitializer();