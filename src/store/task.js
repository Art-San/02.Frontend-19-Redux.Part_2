import { createSlice } from '@reduxjs/toolkit'
const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false }
]

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    completed(state, action) {
      const elementIndex = state.findIndex((el) => el.id === action.payload.id)
      state[elementIndex].completed = !state[elementIndex].completed
    },
    update(state, action) {
      const elementIndex = state.findIndex((el) => el.id === action.payload.id)
      state[elementIndex].title =
        state[elementIndex].title === `Task ${action.payload.id}`
          ? `New title for ${action.payload.id}`
          : `Task ${action.payload.id}`
    },
    remove(state, action) {
      return state.filter((el) => el.id !== action.payload.id)
    }
  }
})

const { actions, reducer: taskReducer } = taskSlice
const { update, remove, completed } = actions

export function taskComplete(id) {
  return completed({ id })
}

export function titleChenge(id) {
  return update({ id })
}

export function taskDeleted(id) {
  return remove({ id })
}

export default taskReducer

// import { createSlice } from '@reduxjs/toolkit'
// const initialState = [
//   {id: 1, title: 'Task 1', completed: false},
//   {id: 2, title: 'Task 2', completed: false}
// ]

// const taskSlice = createSlice({name: 'task', initialState, reducers: {
//   update(state, action) {
//     const elementIndex = state.findIndex(
//       (el) => el.id === action.payload.id
//       )
//       state[elementIndex] = {
//         ...state[elementIndex],
//         ...action.payload
//       }
//   },
//   remove(state, action) {
//         return state.filter((el) => el.id !== action.payload.id)
//     }
// }})

// const { actions, reducer: taskReducer } = taskSlice
// const { update, remove } = actions

// export function taskComplete(id) {
//   return update({ id, completed: true})
// }

// export function titleChenge(id) {
//   return update({ id, title: `New title for ${id}`})

// }

// export function taskDeleted(id) {
//   return remove({ id })
// }

// export default taskReducer
