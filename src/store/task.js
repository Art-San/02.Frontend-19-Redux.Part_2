import { createAction } from '@reduxjs/toolkit'

const completed = createAction('task/completed')
const update = createAction('task/updated')
const remove = createAction('task/removed')

console.log('update', completed.type)

export function taskComplete(id) {
  return completed({ id })
}

export function titleChenge(id) {
  return update({ id })
}

export function taskDeleted(id) {
  return remove({ id })
}

export function taskReducer(state = [], action) {
  if (action.payload) {
    let newArray = [...state]
    const elementIndex = newArray.findIndex((el) => el.id === action.payload.id)

    switch (action.type) {
      case completed.type:
        newArray[elementIndex].completed = !newArray[elementIndex].completed
        return newArray
      case update.type:
        newArray[elementIndex].title =
          newArray[elementIndex].title === `Task ${action.payload.id}`
            ? `New title for ${action.payload.id}`
            : `Task ${action.payload.id}`
        return newArray
      case remove.type:
        return state.filter((el) => el.id !== action.payload.id)
      default:
        return state
    }
  }

  return state
}

export default taskReducer

// function taskReducer(state = [], action) {
//   switch (action.type) {
//     case update.type: {
//       const newArray = [...state]
//       const elementIndex = newArray.findIndex(
//         (el) => el.id === action.payload.id
//       )
//       newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload }
//       return newArray
//     }
//     case remove.type: {
//       return state.filter((el) => el.id !== action.payload.id)
//     }

//     default:
//       return state
//   }
// }

// export default taskReducer
