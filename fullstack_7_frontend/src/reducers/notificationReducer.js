
const notificationReducer = (state = '', action) => {
/*   console.log('state now: ',state)
  console.log(action) */
  switch (action.type){
  case 'SET_MESSAGE':
    return action.notification
  default:
    return state
  }
}

export const notify = (message, type = 'info') => {
  const notification = { message, type }
  return async (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE',
      notification
    })

    setTimeout(() => {

      dispatch({
        type: 'SET_MESSAGE',
        notification: {
          message: ''
        }
      })
    }, 4000)

  }
}



export default notificationReducer