import { serviceRegistry } from './registry';
import { eventSystem } from './events';
import { ConfigValue, ConfigSchema, ConfigUpdatePayload } from '../../types/config';

export class ConfigurationManager {
	private config: Record<string, ConfigValue> = {};
	private secrets: Record<string, string> = {};
	private schemas: Record<string, ConfigSchema> = {};

	constructor() {
		serviceRegistry.register('config', '1.0.0', this);
		eventSystem.subscribe('config:update', this.handleConfigUpdate.bind(this));
	}

	/**
	 * Load configuration from environment variables
	 */
	loadFromEnv(): void {
		this.config = {
			...process.env,
		};
	}

	/**
	 * Set a secret value
	 * @param key Secret key
	 * @param value Secret value
	 */
	setSecret(key: string, value: string): void {
		this.secrets[key] = value;
		eventSystem.publish('config:secret:updated', { key, value });
	}

	/**
	 * Get a configuration value
	 * @param key Configuration key
	 * @returns Configuration value
	 */
	get<T extends ConfigValue = ConfigValue>(key: string): T {
		return (this.config[key] ?? this.secrets[key]) as T;
	}

	/**
	 * Register a configuration schema
	 * @param serviceName Service name
	 * @param schema JSON schema
	 */
	registerSchema(serviceName: string, schema: ConfigSchema): void {
		this.schemas[serviceName] = schema;
	}

	/**
	 * Validate configuration against registered schema
	 * @param serviceName Service name
	 * @param config Configuration to validate
	 * @returns Validation result
	 */
	validate(serviceName: string, _config: Record<string, ConfigValue>): boolean {
		// eslint-disable-line @typescript-eslint/no-unused-vars
		const schema = this.schemas[serviceName];
		if (!schema) return true;

		// TODO: Implement schema validation
		// config parameter is intentionally unused until validation is implemented
		return true;
	}

	private handleConfigUpdate(payload: ConfigUpdatePayload): void {
		this.config[payload.key] = payload.value;
	}
}

export const configManager = new ConfigurationManager();
