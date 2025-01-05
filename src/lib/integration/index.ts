export { serviceRegistry } from './registry';
export { serviceManager } from './manager';
export { eventSystem } from './events';
export { configManager } from './config';
export { serviceInitializer } from '../services/initializer';
export { serviceValidator } from '../services/validator';
export { healthMonitor } from '../services/health';
export { lifecycleManager } from '../services/lifecycle';

/**
 * Initialize all services and integration components
 */
export async function initializeServices(): Promise<void> {
  try {
    await lifecycleManager.startServices();
    await healthMonitor.checkHealth();
  } catch (error) {
    await shutdownServices();
    throw error;
  }
}

/**
 * Shutdown all services and integration components
 */
export async function shutdownServices(): Promise<void> {
  await lifecycleManager.stopServices();
  await healthMonitor.checkHealth();
}

/**
 * Get current health status of all services
 */
export function getServiceHealth(): Promise<HealthStatus> {
  return healthMonitor.checkHealth();
}