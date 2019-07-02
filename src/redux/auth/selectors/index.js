/* istanbul ignore next */
export const SHOW_ALL = 'show_all';
export const SHOW_COMPLETED = 'show_completed';
export const SHOW_ACTIVE = 'show_active';

import { createSelector } from 'reselect';

const getVisibilityFilter = state => state.visibilityFilter;
const getTodos = state => state.todos;

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case SHOW_ALL:
        return todos;
      case SHOW_COMPLETED:
        return todos.filter(t => t.completed);
      case SHOW_ACTIVE:
        return todos.filter(t => !t.completed);
      default:
        throw new Error('Unknown filter: ' + visibilityFilter);
    }
  }
);

export const getCompletedTodoCount = createSelector(
  [getTodos],
  todos =>
    todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
);
