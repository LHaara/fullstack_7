import userService from '../services/users'



const usersReducer = (state = '', action) => {
  /*   console.log('state now: ',state)
    console.log(action) */
  switch (action.type){
  case 'INIT_USERS':
    return state = action.users
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers()
    dispatch({
      type: 'INIT_USERS',
      users
    })
  }
}

export default usersReducer