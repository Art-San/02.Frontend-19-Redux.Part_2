export function logger(store) {
    return function wrapDispatch(next) {
      return function handleAction(action) {  // в текущий момент логер просто пропускае данные
    
        return next(action)
      }
    }
  }



//   export function logger({getState, dispatch}) {
//     return function wrapDispatch(next) {
//       return function handleAction(action) {
//       console.log('next', next)
//       console.log('action', action)
//       if (action.type === 'task/update') {    // в этом месте можем изменять действия
//         return dispatch({ 
//             type: 'task/remove',
//             payload: { ...action.payload}
//         })
//       }
//         return next(action)
//       }
//     }
//   }