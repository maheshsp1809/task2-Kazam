import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { TodoItem } from "../types";
import TodoItemComponent from "./TodoItem";

const socket = io("http://localhost:3001");

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();

    socket.on("updateList", (updatedList: { items: TodoItem[] }) => {
      setTodos(updatedList.items);
    });

    return () => {
      socket.off("updateList");
    };
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fetchAllTasks");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      socket.emit("add", newTodo);
      setNewTodo("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItemComponent key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
