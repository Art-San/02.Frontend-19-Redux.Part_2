import * as actionsTypes from './actionTypes'

export function taskComplete(id) {
  return {
    type: actionsTypes.taskCompleted,
    payload: { id }
  }
}

export function titleChenge(id) {
  return {
    type: actionsTypes.taskUpdated,
    payload: { id }
  }
}

export function taskDeleted(id) {
  return {
    type: actionsTypes.taskDeleted,
    payload: { id }
  }
}
