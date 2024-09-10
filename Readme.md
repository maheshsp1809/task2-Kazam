# Full Stack To-Do List Application

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
