export type ConfigValue = string | number | boolean | object | null | undefined;

export interface ConfigSchema {
	type: 'object';
	properties: Record<
		string,
		{
			type: 'string' | 'number' | 'boolean' | 'object';
			required?: boolean;
			default?: ConfigValue;
		}
	>;
}

export interface ConfigUpdatePayload {
	key: string;
	value: ConfigValue;
}
