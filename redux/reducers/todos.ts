import { Todo, TodoActionTypes } from "@typage/types";
import { ADD_TODO, TOGGLE_TODO } from "../constants/todos";

const initialState: Todo[] = [];

export default function todosReducer(
  state = initialState,
  action: TodoActionTypes
): Todo[] {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
        },
      ];
    case TOGGLE_TODO:
      return state.map((todo: any) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
}
