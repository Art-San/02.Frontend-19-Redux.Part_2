import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client'
import {completeTask, titleChenge, taskDeleted, getTasks } from './store/task'
import configureStore from './store/store';
import { Provider, useSelector, useDispatch } from 'react-redux';



const store = configureStore()
const App = () => {
  const state = useSelector((state) => state.tasks.entities)
  const isLoading = useSelector(state => state.tasks.isLoading)
  const error = useSelector(state => state.errors.entities[0])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks())
  }, [])

 
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
    <ul>
      {state.map((el) => (
        <li key={el.id}>
          <p>{el.title}</p>
          <p> {`Comleted: ${el.completed}`}</p>
          <button onClick={() => dispatch(completeTask(el.id))}>
            Completed
          </button>
          <button onClick={() => changeTitle(el.id)}>
            Chsange Title
          </button>
          <button onClick={() => deleteTask(el.id)}>
            Delete
          </button>
          <hr/>
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