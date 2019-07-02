import * as types from '../actions';

export const addTodo = (text: string) => ({ type: types.ADD_TODO, text });
export const deleteTodo = (id: number) => ({ type: types.DELETE_TODO, id });
export const editTodo = (id: number, text: string) => ({
  id,
  text,
  type: types.EDIT_TODO,
});
export const completeTodo = (id: number) => ({ type: types.COMPLETE_TODO, id });
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });
export const setVisibilityFilter = (filter: string) => ({
  filter,
  type: types.SET_VISIBILITY_FILTER,
});
