import { Redis } from '@upstash/redis';

const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || ''
});

export const connectRedis = async () => {
  // Upstash Redis client is always connected
  return redisClient;
};

export default redisClient;
