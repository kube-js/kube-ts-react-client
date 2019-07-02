import * as actions from '.'
import * as types from '../actions'

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    expect(actions.addTodo('Use Redux')).toEqual({
      text: 'Use Redux',
      type: types.ADD_TODO,
    })
  })

  it('deleteTodo should create DELETE_TODO action', () => {
    expect(actions.deleteTodo(1)).toEqual({
      id: 1,
      type: types.DELETE_TODO,
    })
  })

  it('editTodo should create EDIT_TODO action', () => {
    expect(actions.editTodo(1, 'Use Redux everywhere')).toEqual({
      id: 1,
      text: 'Use Redux everywhere',
      type: types.EDIT_TODO,
    })
  })

  it('completeTodo should create COMPLETE_TODO action', () => {
    expect(actions.completeTodo(1)).toEqual({
      id: 1,
      type: types.COMPLETE_TODO,
    })
  })

  it('completeAll should create COMPLETE_ALL action', () => {
    expect(actions.completeAllTodos()).toEqual({
      type: types.COMPLETE_ALL_TODOS
    })
  })

  it('clearCompleted should create CLEAR_COMPLETED action', () => {
    expect(actions.clearCompleted()).toEqual({
      type: types.CLEAR_COMPLETED
    })
  })
})
