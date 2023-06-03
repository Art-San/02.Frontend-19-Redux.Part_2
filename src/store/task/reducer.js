import { taskUpdated, taskCompleted, taskDeleted } from './actionTypes'

export function taskReducer(state = [], action) {
  if (action.payload) {
    let newArray = [...state]
    const elementIndex = newArray.findIndex((el) => el.id === action.payload.id)

    switch (action.type) {
      case taskCompleted:
        newArray[elementIndex].completed = !newArray[elementIndex].completed
        return newArray
      case taskUpdated:
        newArray[elementIndex].title =
          newArray[elementIndex].title === `Task ${action.payload.id}`
            ? `New title for ${action.payload.id}`
            : `Task ${action.payload.id}`
        return newArray
      case taskDeleted:
        return state.filter((el) => el.id !== action.payload.id)
      default:
        return state
    }
  }

  return state
}

// import { taskDeleted, taskUpdated } from "./actionTypes";

// export function taskReduser(state = [], action) {
//     switch (action.type) {
//         case taskUpdated: {
//           const newArray = [...state]
//         const elementIndex = newArray.findIndex(
//           (el) => el.id === action.payload.id
//           )
//           newArray[elementIndex] = {...newArray[elementIndex], ...action.payload}
//           return newArray
//         }
//         case taskDeleted: {
//             return state.filter((el) => el.id !== action.payload.id)
//         }

//       default:
//         return state
//     }

//   }
