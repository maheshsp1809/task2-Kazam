import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createClient } from 'redis';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const redisClient = createClient({
  url: 'redis://localhost:6379'
});

(async () => {
  await redisClient.connect();
})();

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
let usercount=0;
io.on('connection', (socket) => {
  console.log('A user connected',++usercount);

  socket.on('message', async (msg: string) => {
    await redisClient.lPush('messages', msg);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected',--usercount);
  });
});

export { app, httpServer };