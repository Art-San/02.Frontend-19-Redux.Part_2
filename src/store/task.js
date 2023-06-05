import { createAction, createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
const initialState = []

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recived(state, action) {
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
const { update, remove, completed, recived } = actions

const taskRequested = createAction('task/requested') // Действия для отладки запросов
const taskRequestFailed = createAction('task/requestFailed') // Действия для отладки запросов

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    dispatch(recived(data))
  } catch (error) {
    dispatch(taskRequestFailed(error.message))
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

// import { createAction, createSlice } from '@reduxjs/toolkit'
// import todosService from '../services/todos.service'
// const initialState = []

// const taskSlice = createSlice({
//   name: 'task',
//   initialState,
//   reducers: {
//     recived(state, action) {
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
// const { update, remove, recived } = actions

// const taskRequested = createAction('task/requested')
// const taskRequestFailed = createAction('task/requestFailed')

// export const getTasks = () => async (dispatch) => {
//   dispatch(taskRequested())
//   try {
//     const data = await todosService.fetch()
//     dispatch(recived(data))
//   } catch (error) {
//     dispatch(taskRequestFailed(error.message))
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
