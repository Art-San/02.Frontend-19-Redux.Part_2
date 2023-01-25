import { createStore } from "redux";
import taskReducer from "./task";



function configureStore(params) {
    return createStore(taskReducer)
}

export default configureStore