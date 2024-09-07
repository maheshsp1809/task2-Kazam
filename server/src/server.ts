import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import redisClient, { connectRedis } from './redis';
import { connectMongoDB, getCollection } from './mongodb';
import { TodoItem, TodoList } from './types';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

const REDIS_KEY = `FULLSTACK_TASK_${process.env.YOUR_FIRST_NAME}`;

const getTodoList = async (): Promise<TodoList> => {
  const data = await redisClient.get(REDIS_KEY);
  return data ? JSON.parse(data) : { items: [] };
};

const saveTodoList = async (todoList: TodoList) => {
  await redisClient.set(REDIS_KEY, JSON.stringify(todoList));
};

const moveToMongoDB = async (items: TodoItem[]) => {
  try {
    const collection = getCollection();
    await collection.insertMany(items);
    console.log(`Moved ${items.length} items to MongoDB Atlas`);
  } catch (error) {
    console.error("Error moving items to MongoDB Atlas:", error);
  }
};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('add', async (text: string) => {
    try {
      const todoList = await getTodoList();
      const newItem: TodoItem = { id: uuidv4(), text, completed: false };
      todoList.items.push(newItem);

      if (todoList.items.length > 5) {
        await moveToMongoDB(todoList.items.slice(0, 5));
        todoList.items = todoList.items.slice(5);
      }

      await saveTodoList(todoList);
      io.emit('updateList', todoList);
    } catch (error) {
      console.error("Error adding todo item:", error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.get('/fetchAllTasks', async (req, res) => {
  try {
    const todoList = await getTodoList();
    const collection = getCollection();
    const mongoItems = await collection.find({}).toArray();
    const allItems = [...mongoItems, ...todoList.items];
    res.json(allItems);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectRedis();
    await connectMongoDB();

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();