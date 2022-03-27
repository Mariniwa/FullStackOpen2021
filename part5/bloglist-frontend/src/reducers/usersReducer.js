const usersReducer = (state = null, action) => {
  switch(action.type) {
  case 'INIT_USERS':
    return action.users
  default:
    return state
  }
}

export const initUsers = (users) => {
  return async dispatch => {
    dispatch({
      type: 'INIT_USERS',
      users
    })
  }
}

export default usersReducer