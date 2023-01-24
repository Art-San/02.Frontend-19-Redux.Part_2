import { createAction } from '@reduxjs/toolkit'

const update = createAction('task/updated')
const remove = createAction('task/removed')

console.log('update', update)

export function taskComplete(id) {
    return update({ id, completed: true})
}

export function titleChenge(id) {
    return update({ id, title: `New title for ${id}`})

}

export function taskDeleted(id) {
    return remove({ id })
}

function taskReduser(state = [], action) {
    switch (action.type) {
        case update.type: {
          const newArray = [...state]
        const elementIndex = newArray.findIndex(
          (el) => el.id === action.payload.id
          )
          newArray[elementIndex] = {...newArray[elementIndex], ...action.payload}
          return newArray
        }
        case remove.type: {
            return state.filter((el) => el.id !== action.payload.id)
        }
        
      default:
        return state
    }
    
  }

export default taskReduser