import { createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
const initialState = []

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    set(state, action) {
      return (state = action.payload)
    },
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
const { update, remove, completed, set } = actions

export const getTasks = () => async (dispatch) => {
  try {
    const data = await todosService.fetch()
    dispatch(set(data))
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(completed({ id }))
}

export function titleChenge(id) {
  return update({ id })
}

export function taskDeleted(id) {
  return remove({ id })
}

export default taskReducer

// import { createSlice } from '@reduxjs/toolkit'
// import todosService from '../services/todos.service'
// const initialState = []

// const taskSlice = createSlice({
//   name: 'task',
//   initialState,
//   reducers: {
//     set(state, action) {
//      return state = action.payload
//     },
//     update(state, action) {
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
// const { update, remove, set } = actions

// export const getTasks = () => async (dispatch) => {
//   try {
//     const data = await todosService.fetch()
//     dispatch(set(data))
//     console.log(data)
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const completeTask = (id) => (dispatch, getState) => {
//   dispatch(update({ id, completed: true}))
// }

// export function titleChenge(id) {
//   return update({ id, title: `New title for ${id}`})

// }

// export function taskDeleted(id) {
//   return remove({ id })
// }

// export default taskReducer
