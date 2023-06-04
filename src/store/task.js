const TASK_COMPLETED = 'task/completed'
const TASK_UPDATED = 'task/updated'
const TASK_DELETED = 'task/deleted'

export function taskComplete(id) {
  return {
    type: TASK_COMPLETED,
    payload: { id }
  }
}

export function titleChenge(id) {
  return {
    type: TASK_UPDATED,
    payload: { id }
  }
}

export function taskDeleted(id) {
  return {
    type: TASK_DELETED,
    payload: { id }
  }
}

export function taskReducer(state = [], action) {
  if (action.payload) {
    let newArray = [...state]
    const elementIndex = newArray.findIndex((el) => el.id === action.payload.id)

    switch (action.type) {
      case TASK_COMPLETED:
        newArray[elementIndex].completed = !newArray[elementIndex].completed
        return newArray
      case TASK_UPDATED:
        newArray[elementIndex].title =
          newArray[elementIndex].title === `Task ${action.payload.id}`
            ? `New title for ${action.payload.id}`
            : `Task ${action.payload.id}`
        return newArray
      case TASK_DELETED:
        return state.filter((el) => el.id !== action.payload.id)
      default:
        return state
    }
  }

  return state
}

export default taskReducer

// function taskReduser(state = [], action) {
//     switch (action.type) {
//         case TASK_UPDATED: {
//           const newArray = [...state]
//         const elementIndex = newArray.findIndex(
//           (el) => el.id === action.payload.id
//           )
//           newArray[elementIndex] = {...newArray[elementIndex], ...action.payload}
//           return newArray
//         }
//         case TASK_DELETED: {
//             return state.filter((el) => el.id !== action.payload.id)
//         }

//       default:
//         return state
//     }

//   }

// export default taskReduser
