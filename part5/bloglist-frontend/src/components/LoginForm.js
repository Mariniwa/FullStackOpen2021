import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { badNotificationChange, goodNotificationChange } from '../reducers/notificationReducer'
import { setLoggedInUser } from '../reducers/loggedInUserReducer'
import {
  TextField,
  Button
} from '@material-ui/core'

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword
}) => {
  const dispatch = useDispatch()
  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLoggedInUser(user))
      setUsername('')
      setPassword('')
      dispatch(goodNotificationChange('login successful!'))
    } catch (exception) {
      dispatch(badNotificationChange('Wrong credentials'))
    }
  }

  return (
    <form onSubmit={loginHandler}>
      <div>
        <TextField
          onChange={({ target }) => setUsername(target.value)}
          value={username}
          label="username"
        />
        <br></br>
        <TextField
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          label='password'
          type="password"
        />
      </div>
      <Button variant='contained' color='primary' type="submit" id="loginButton">login</Button>
    </form>
  )
}

export default LoginForm