import { createStore } from "redux";
import taskReduser from "./task";

const initialState = [
    {id: 1, title: 'Task 1', completed: false},
    {id: 2, title: 'Task 2', completed: false}
  ]

function configureStore(params) {
    return createStore(taskReduser, initialState)
}

export default configureStore