const initNotif = {
  good: null,
  bad: null
}

const notificationReducer = (state = initNotif, action) => {
  switch (action.type) {
  case 'SET_GOOD_NOTIFICATION':
    return {
      good: action.notification,
      bad: null
    }
  case 'SET_BAD_NOTIFICATION':
    return {
      good: null,
      bad: action.notification
    }
  case 'CLEAR_NOTIFICATION':
    return initNotif
  default:
    return state
  }
}

let timeoutId

export const goodNotificationChange = (notification) => {
  return async dispatch => {
    dispatch({ type: 'SET_GOOD_NOTIFICATION',
      notification
    })
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }
}

export const badNotificationChange = (notification) => {
  return async dispatch => {
    dispatch({ type: 'SET_BAD_NOTIFICATION',
      notification
    })
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }
}

export const clearNotification = () => {
  return async dispatch => {
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }
}

export default notificationReducer
