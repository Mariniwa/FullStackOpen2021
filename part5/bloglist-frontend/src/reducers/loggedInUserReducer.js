const loggedInUserReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.user
  default:
    return state
  }
}

export const setLoggedInUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export default loggedInUserReducer