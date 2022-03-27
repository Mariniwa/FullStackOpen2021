import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers } from 'redux'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import loggedInUserReducer from './reducers/loggedInUserReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  loggedInUser: loggedInUserReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store