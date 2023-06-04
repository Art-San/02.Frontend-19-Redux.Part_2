import { createAction, createReducer } from '@reduxjs/toolkit'
const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false }
]
const update = createAction('task/updated')
const remove = createAction('task/removed')

export function taskComplete(id) {
  return update({ id, completed: true })
}

export function titleChenge(id) {
  return update({ id, title: `New title for ${id}` })
}

export function taskDeleted(id) {
  return remove({ id })
}

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      const elementIndex = state.findIndex((el) => el.id === action.payload.id)
      state[elementIndex] = {
        ...state[elementIndex],
        ...action.payload
      }
    })
    .addCase(remove, (state, action) => {
      return state.filter((el) => el.id !== action.payload.id) // '*' Прямая государственная мутация
    })
})

export default taskReducer

export function taskReducer(state = [], action) {
  if (action.payload) {
    let newArray = [...state]
    const elementIndex = newArray.findIndex((el) => el.id === action.payload.id)

    switch (action.type) {
      case completed.type:
        newArray[elementIndex].completed = !newArray[elementIndex].completed
        return newArray
      case update.type:
        newArray[elementIndex].title =
          newArray[elementIndex].title === `Task ${action.payload.id}`
            ? `New title for ${action.payload.id}`
            : `Task ${action.payload.id}`
        return newArray
      case remove.type:
        return state.filter((el) => el.id !== action.payload.id)
      default:
        return state
    }
  }

  return state
}
