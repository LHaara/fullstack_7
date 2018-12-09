const userReducer = (state = '', action) => {
/*   console.log('state now: ',state)
  console.log(action) */
  switch (action.type){
  case 'LOGGED_USER':
    return action.user
  default:
    return state
  }
}

export const loggedUser = (user) => {
/*   console.log('loggedUser')
  console.log(user) */
  return async (dispatch) => {
    dispatch({
      type: 'LOGGED_USER',
      user
    })
  }
}

export default userReducer