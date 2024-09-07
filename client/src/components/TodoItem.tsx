import React from "react";
import { TodoItem } from "../types";

interface Props {
  todo: TodoItem;
}

const TodoItemComponent: React.FC<Props> = ({ todo }) => {
  return (
    <li className="flex items-center justify-between p-2 border-b">
      <span className={`${todo.completed ? "line-through" : ""}`}>
        {todo.text}
      </span>
    </li>
  );
};

export default TodoItemComponent;
