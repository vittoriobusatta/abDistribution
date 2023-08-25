import { ADD_TODO, TOGGLE_TODO } from "../constants/todos";

export const addTodo = (id, text) => ({
  type: ADD_TODO,
  text,
  id,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});
