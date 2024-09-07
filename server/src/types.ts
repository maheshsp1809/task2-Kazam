export interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
  }
  
  export interface TodoList {
    items: TodoItem[];
  }