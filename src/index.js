import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { taskComplete, titleChenge, taskDeleted } from './store/task'
import configureStore from './store/store'

const store = configureStore()
const App = () => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  const changeTitle = (taskId) => {
    store.dispatch(titleChenge(taskId))
  }

  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId))
  }

  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p> {`Comleted: ${el.completed}`}</p>
            <button onClick={() => store.dispatch(taskComplete(el.id))}>
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
    <App />
  </React.StrictMode>
)
