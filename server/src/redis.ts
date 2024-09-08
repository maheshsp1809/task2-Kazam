import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const redisPortString = process.env.REDIS_PORT;
const redisPort = redisPortString ? parseInt(redisPortString, 10) : null;

if (!redisPort || isNaN(redisPort)) {
  throw new Error('Invalid or missing Redis port');
}

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: redisPort,
  }
});

// Handle Redis connection errors
redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Function to connect to Redis
export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Error connecting to Redis', err);
  }
};

export default redisClient;
