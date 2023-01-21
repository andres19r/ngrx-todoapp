import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import {
  clearCompleted,
  create,
  deleteTodo,
  edit,
  toggle,
  toggleAll,
} from './todo.actions';

export const initialState: Todo[] = [
  new Todo('Save the world'),
  new Todo('Defeat Thanos'),
  new Todo('Buy Iron Man suit'),
  new Todo('Stole the Caps shield'),
];

export const todoReducer = createReducer(
  initialState,
  on(create, (state, { text }) => [...state, new Todo(text)]),
  on(deleteTodo, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      } else {
        return todo;
      }
    });
  }),
  on(edit, (state, { id, text }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      } else {
        return todo;
      }
    });
  }),
  on(toggleAll, (state, { completed }) =>
    state.map((todo) => ({
      ...todo,
      completed,
    }))
  ),
  on(clearCompleted, (state) => state.filter((todo) => !todo.completed))
);
