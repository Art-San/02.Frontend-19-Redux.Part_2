import { createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import { setError } from './error'
const initialState = { entities: [], isLoading: true, error: null }

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    completed(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      )
      state.entities[elementIndex].completed =
        !state.entities[elementIndex].completed
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      )
      state.entities[elementIndex].title =
        state.entities[elementIndex].title === `Task ${action.payload.id}`
          ? `New title for ${action.payload.id}`
          : `Task ${action.payload.id}`
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      )
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state, action) {
      state.isLoading = false
    }
  }
})

const { actions, reducer: taskReducer } = taskSlice
const { update, remove, completed, recived, taskRequested, taskRequestFailed } =
  actions

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    dispatch(recived(data))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
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
// import { setError } from './error'
// const initialState = {entities: [], isLoading: true }

// const taskSlice = createSlice({
//     name: 'task',
//     initialState,
//     reducers: {
//       recived(state, action) {
//         state.entities = action.payload
//         state.isLoading = false
//       },
//       update(state, action) {
//       const elementIndex = state.entities.findIndex(
//         (el) => el.id === action.payload.id
//         )
//         state.entities[elementIndex] = {
//           ...state.entities[elementIndex],
//           ...action.payload
//         }
//       },
//       remove(state, action) {
//         state.entities = state.entities.filter(
//             (el) => el.id !== action.payload.id
//         );
//       },
//       taskRequested(state) {
//         state.isLoading = true
//       },
//       taskRequestFailed(state, action) {
//         state.isLoading = false
//       }
//     }
// })

// const { actions, reducer: taskReducer } = taskSlice
// const { update, remove, recived, taskRequested, taskRequestFailed } = actions

// export const getTasks = () => async (dispatch) => {
//   dispatch(taskRequested())
//   try {
//     const data = await todosService.fetch()
//     dispatch(recived(data))
//   } catch (error) {
//     dispatch(taskRequestFailed())
//     dispatch(setError(error.message))
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
