import { createSlice, createAction } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import { setError } from './error'
const initialState = { entities: [], isLoading: true }

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
    // update(state, action) {
    // const elementIndex = state.entities.findIndex(
    //   (el) => el.id === action.payload.id
    //   )
    //   state.entities[elementIndex] = {
    //     ...state.entities[elementIndex],
    //     ...action.payload
    //   }
    // },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      )
    },
    loadTasksRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state, action) {
      state.isLoading = false
    },
    taskAdded(state, action) {
      state.entities.push(action.payload)
    }
  }
})

const { actions, reducer: taskReducer } = taskSlice
const {
  update,
  remove,
  recived,
  completed,
  taskRequestFailed,
  taskAdded,
  loadTasksRequested
} = actions
const taskRequested = createAction('task/taskRequested')

export const loadTasks = () => async (dispatch) => {
  dispatch(loadTasksRequested())
  try {
    const data = await todosService.fetch()
    dispatch(recived(data))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
  }
}

export const createTask = (task) => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.create(task)
    dispatch(taskAdded(data))
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

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer
