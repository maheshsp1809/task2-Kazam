# Full Stack To-Do List Application

[Click to watch the video](https://drive.google.com/file/d/1cAjXSm8R5R9EU2M8N5SP7ECRxhcLf7je/view?usp=sharing)

This is a full-stack application implementing a to-do list using Node.js/Express.js, WebSockets, Redis, and MongoDB.

## Project Structure

- **Frontend:** Located in the `client` folder.
- **Backend:** Located in the `server` folder.

## Prerequisites

- Node.js
- npm (v6+)
- Redis
- MongoDB

## Environment Variables

In the `server` folder, create a `.env` file with the following:

```
REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=
MONGODB_URI=
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/maheshsp1809/task2-Kazam.git
   ```

2. Install dependencies:

   ```bash
   cd task2-Kazam
   cd server
   npm install
   cd ../client
   npm install
   ```

3. Start the server:

   ```bash
   cd ../server
   npm run server
   ```

4. Start the client:
   ```bash
   cd ../client
   npm run dev
   ```

## Accessing the Application

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Features

- Real-time updates using WebSockets
- Data persistence with MongoDB
- Caching with Redis for improved performance

## Acknowledgments

-- Special thanks to:

- Diya Ryall for the assignment
- Swapnajit Tech Lead Kazam.

### Image 1

![Image 1](public/frontend1.png)

### Websocket connection

![Image 2](public/websocket.png)

### Frontend

![Image 3](public/frontend3.png)

### Redis_Key and Value

![Image 4](public/redis_cache.png)

### Redis_MongoDb

![Image 5](public/redis_mongodb_users.png)

### MongoDb data

![Image 6](public/mongodb_cloud.png)
