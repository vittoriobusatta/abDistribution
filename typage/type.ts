import { ADD_TODO, TOGGLE_TODO } from "@redux/constants/todos";

export interface Product {
  id: string;
  name: string;
  title: string;
  description: string;
  ingredient: string;
  image: string;
  color1: string;
  color2: string;
  gradient: string;
}

export interface Collection {
  id: string;
  name: string;
  category: string;
  origine: string;
  brand: string;
  color1: string;
  color2: string;
  logocolor1: string;
  logocolor2: string;
  landingcolor1: string;
  landingcolor2: string;
  background: string;
  preview: string;
  description: string;
  products: Product[];
}

interface AddTodoAction {
  type: typeof ADD_TODO;
  id: number;
  text: string;
}

interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  id: number;
}

export type TodoActionTypes = AddTodoAction | ToggleTodoAction;

export interface Todo {
  id: number;
  text: string;
  completed?: boolean;
}