import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const uri ='https://todo-server-expressjs.vercel.app/api/todos';
// Async Thunks for API calls
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(uri);
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await axios.post(uri, todo);
  return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const response = await axios.put(`${uri}/${todo._id}`, todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${uri}/${id}`);
  return id;
});

// Todo slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo._id === action.payload._id);
        state.todos[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
