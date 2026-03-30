import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export type Todo = {
  id: string;
  text: string;
  username: string;
  isTodoCompleted: boolean;
};

const initialState: { todos: Todo[] } = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { text, username } = action.payload;

      state.todos.push({
        id: uuid(),
        text,
        username,
        isTodoCompleted: false
      });
    },
    deleteTodo: (state, action) => {
      const { id, username } = action.payload;

      state.todos = state.todos.filter(
        (todo) => !(todo.id === id && todo.username === username),
      );
    },
    updateTodo: (state, action) => {
      const { id, text, username } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id && todo.username === username ? { ...todo, text } : todo,
      );
    },
    completedTodo: (state, action) => {
      const { id, username } = action.payload;

      state.todos = state.todos.map((todo) =>
        todo.id === id && todo.username === username
          ? { ...todo, isTodoCompleted: !todo.isTodoCompleted }
          : todo,
      );
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, completedTodo } = todoSlice.actions;
export default todoSlice.reducer;
