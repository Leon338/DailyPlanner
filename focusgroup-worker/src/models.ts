export interface User {
  username: string;
  password: string;
  createdAt: number;
}

export interface Board {
  name: string;
  todos: Todo[];
}

export interface Todo {
  text: string;
  checked: boolean;
  worker: string;
}

export interface Timer {
  minutes: number;
}
