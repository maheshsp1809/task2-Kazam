import React from "react";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <TodoList />
    </div>
  );
};

export default App;
