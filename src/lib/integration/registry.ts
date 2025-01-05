type ServiceEntry<T> = {
	instance: T;
	version: string;
	dependencies: string[];
};

/**
 * ServiceRegistry handles registration and retrieval of services
 * with dependency resolution and type safety
 */
export class ServiceRegistry {
	private services: Map<string, ServiceEntry<unknown>> = new Map();
	private initialized = false;

	/**
	 * Register a new service with the registry
	 * @param name Unique service name
	 * @param version Service version
	 * @param instance Service instance
	 * @param dependencies Array of service names this service depends on
	 */
	register<T>(name: string, version: string, instance: T, dependencies: string[] = []): void {
		if (this.services.has(name)) {
			throw new Error(`Service ${name} already registered`);
		}

		this.services.set(name, {
			instance,
			version,
			dependencies,
		});
	}

	/**
	 * Retrieve a service instance with type safety
	 * @param name Service name to retrieve
	 * @returns Service instance of type T
	 * @throws Error if service not found or dependencies missing
	 */
	getService<T>(name: string): T {
		const service = this.services.get(name);
		if (!service) {
			throw new Error(`Service ${name} not found`);
		}

		// Verify dependencies are available
		for (const dep of service.dependencies) {
			if (!this.services.has(dep)) {
				throw new Error(`Service ${name} missing dependency: ${dep}`);
			}
		}

		return service.instance as T;
	}

	/**
	 * Initialize all registered services in dependency order
	 */
	async initialize(): Promise<void> {
		if (this.initialized) return;

		// TODO: Implement dependency graph resolution
		// and initialization order

		this.initialized = true;
	}

	/**
	 * Get all registered services
	 * @returns Iterator of service entries
	 */
	getServices(): IterableIterator<ServiceEntry<unknown>> {
		return this.services.values();
	}

	/**
	 * Shutdown all services and clear the registry
	 */
	async shutdown(): Promise<void> {
		// TODO: Implement graceful shutdown
		this.services.clear();
	}
}

export const serviceRegistry = new ServiceRegistry();
