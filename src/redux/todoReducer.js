import { createSlice } from "@reduxjs/toolkit";

// Function to save todos to local storage
const saveToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to get todos from local storage
const getFromLocalStorage = () => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

const initialState = getFromLocalStorage();

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    AddTodo: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    UpdateTodo: (state, action) => {
      state = state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      saveToLocalStorage(state);
      return state;
    },
    DeleteTodo: (state, action) => {
      state = state.filter((todo) => todo.id !== action.payload);
      saveToLocalStorage(state);
      return state;
    },
  },
});

export const { AddTodo, DeleteTodo, UpdateTodo } = todoSlice.actions;

export default todoSlice.reducer;
