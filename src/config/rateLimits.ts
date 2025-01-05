export const rateLimits = {
	default: {
		window: 60, // seconds
		max: 100, // requests
	},
	tasks: {
		window: 60,
		max: 50,
	},
	providers: {
		window: 60,
		max: 30,
	},
};
