declare module 'settings' {
	interface UserSettings {
		profile: {
			name: string;
			email: string;
			avatarUrl?: string;
		};
		notifications: {
			email: boolean;
			push: boolean;
			frequency: 'immediate' | 'daily' | 'weekly';
		};
		platforms: {
			[key: string]: {
				enabled: boolean;
				settings: Record<string, string | number | boolean>;
			};
		};
		appearance: {
			theme: 'light' | 'dark' | 'system';
			fontSize: number;
		};
	}
}
