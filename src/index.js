import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import * as actions from './store/actions'
import { initiateStore } from './store/store';



const store = initiateStore()
const App = () => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  const completeTask = (taskId) => {
    store.dispatch(actions.taskComplete(taskId))
  }

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChenge(taskId))
  }

  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId))
  }

  return (
    <>
    <h1>App</h1>
    <ul>
      {state.map((el) => (
        <li key={el.id}>
          <p>{el.title}</p>
          <p> {`Comleted: ${el.completed}`}</p>
          <button onClick={() => completeTask(el.id)}>
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
    <App />
  </React.StrictMode>
)