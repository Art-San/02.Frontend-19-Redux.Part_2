import { createAction, createReducer } from '@reduxjs/toolkit'
const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false }
]
const completed = createAction('task/completed')
const update = createAction('task/updated')
const remove = createAction('task/removed')

export function taskComplete(id) {
  return completed({ id })
}

export function titleChenge(id) {
  return update({ id })
}

export function taskDeleted(id) {
  return remove({ id })
}

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(completed, (state, action) => {
      const elementIndex = state.findIndex((el) => el.id === action.payload.id)
      state[elementIndex].completed = !state[elementIndex].completed
    })
    .addCase(update, (state, action) => {
      const elementIndex = state.findIndex((el) => el.id === action.payload.id)

      state[elementIndex].title =
        state[elementIndex].title === `Task ${action.payload.id}`
          ? `New title for ${action.payload.id}`
          : `Task ${action.payload.id}`
    })
    .addCase(remove, (state, action) => {
      return state.filter((el) => el.id !== action.payload.id) // '*' Прямая государственная мутация "Direct State Mutation"
      // state.filter((el) => el.id !== action.payload.id) // работать не будет, нужно добавит ретурн явно указываем изменения,
      // https://redux-toolkit.js.org/api/createReducer#direct-state-mutation лучше тут читать
    })
})

export default taskReducer

// import { createAction, createReducer } from '@reduxjs/toolkit'
// const initialState = [
//   {id: 1, title: 'Task 1', completed: false},
//   {id: 2, title: 'Task 2', completed: false}
// ]
// const update = createAction('task/updated')
// const remove = createAction('task/removed')

// export function taskComplete(id) {
//     return update({ id, completed: true})
// }

// export function titleChenge(id) {
//     return update({ id, title: `New title for ${id}`})

// }

// export function taskDeleted(id) {
//     return remove({ id })
// }

// const taskReducer = createReducer(initialState, (builder) => {
//   builder.addCase(update, (state, action) => {
//     const elementIndex = state.findIndex(
//       (el) => el.id === action.payload.id
//       )
//       state[elementIndex] = {
//         ...state[elementIndex],
//         ...action.payload
//       }
//   }).addCase(remove, (state, action) => {
//     return state.filter((el) => el.id !== action.payload.id) // '*' Прямая государственная мутация
//   })
// })

// export default taskReducer
