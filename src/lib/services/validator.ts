import { configManager } from '../integration/config';
/// <reference path="../../types/lib.d.ts" />

export class ServiceValidator {
  /**
   * Validate service configuration against its schema
   * @param serviceName Name of the service
   * @param config Configuration to validate
   * @returns Validation result with detailed errors
   */
  validate(serviceName: string, config: any): { valid: boolean; errors: string[] } {
    const validationResult = configManager.validate(serviceName, config);
    
    if (validationResult) {
      return { valid: true, errors: [] };
    }

    // TODO: Implement detailed schema validation
    return {
      valid: false,
      errors: [`Invalid configuration for service ${serviceName}`]
    };
  }

  /**
   * Register a validation schema for a service
   * @param serviceName Name of the service
   * @param schema JSON schema for validation
   */
  registerSchema(serviceName: string, schema: any): void {
    configManager.registerSchema(serviceName, schema);
  }
}

export const serviceValidator = new ServiceValidator();