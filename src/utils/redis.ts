import { createClient } from 'redis';

const redisClient = createClient({
	socket: {
		host: process.env.REDIS_HOST || 'localhost',
		port: parseInt(process.env.REDIS_PORT || '6379')
	}
});

redisClient.on('error', (err: Error) => {
	console.error('Redis error:', err);
});

redisClient.on('connect', () => {
	console.log('Connected to Redis');
});

export const connectRedis = async () => {
	if (!redisClient.isOpen) {
		await redisClient.connect();
	}
	return redisClient;
};

export default redisClient;
