import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {
  completeTask,
  titleChenge,
  taskDeleted,
  getTasks,
  loadTasks,
  getTasksLoadingStatus,
  createTask
} from './store/task'
import configureStore from './store/store'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { getError } from './store/error'

const store = configureStore()
const App = () => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, [dispatch])

  const addNewTask = () => {
    dispatch(createTask({ userId: 1, title: 'SomeNew Task', completed: false }))
  }

  const changeTitle = (taskId) => {
    dispatch(titleChenge(taskId))
  }

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <h1>App</h1>
      <button onClick={addNewTask}>Add Task</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p> {`Comleted: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Completed
            </button>
            <button onClick={() => changeTitle(el.id)}>Chsange Title</button>
            <button onClick={() => deleteTask(el.id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// изменил название на гит хабе
