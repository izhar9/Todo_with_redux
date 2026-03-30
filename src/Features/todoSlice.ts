import {  createSlice   } from '@reduxjs/toolkit';
import { v4 as uuid } from "uuid";

type Todo = {
    id: string;
    text: string;
    username: string;
}

const initialState: { todos: Todo[] } = {
    todos: []
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const { text, username } = action.payload;

            state.todos.push({
                id: uuid(),
                text,
                username
            });
        },
        deleteTodo: (state, action) => {
            const { id, username } = action.payload;

            state.todos = state.todos.filter(
                (todo) => !(todo.id === id && todo.username === username)
            );
        },
        updateTodo: (state, action) => {
            const {id, text} = action.payload;
            state.todos = state.todos.map((todo) => 
                todo.id === id ? {...todo, text} : todo
            )
        }
    }
})

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer