import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Togglable from './components/Togglable'
import ShowBlogs from './components/ShowBlogs'
import { useDispatch, useSelector } from 'react-redux'
import { badNotificationChange, goodNotificationChange } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogsReducer'
import { setLoggedInUser } from './reducers/loggedInUserReducer'
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom'
import { initUsers } from './reducers/usersReducer'
import UsersTable from './components/UsersTable'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import Menu from './components/Menu'
import {
  Container,
  Button
} from '@material-ui/core'

const App = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const refreshBlogs = async () => {
    await blogService.getAll().then((blogs) => {
      const descendingOrder = blogs.sort((a, b) => b.likes - a.likes)
      dispatch(initBlogs(descendingOrder))
    })
  }

  const getUsers = async () => {
    await userService.getAll().then(users => {
      dispatch(initUsers(users))
    })
  }

  useEffect(async () => {
    await refreshBlogs()
    await getUsers()
    const loggedInUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setLoggedInUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const user = useSelector(state => state.loggedInUser)

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      refreshBlogs()
      dispatch(goodNotificationChange('blog added!'))
    } catch (exception) {
      dispatch(badNotificationChange('You must write a title and an url'))
    }
  }

  const addLike = async (blog) => {
    const modifiedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    await blogService.update(blog.id, modifiedBlog)
    await refreshBlogs()
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      history.push('/')
      await blogService.deleteBlog(blog.id)
      await refreshBlogs()
    }
  }

  const logOutHandler = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setLoggedInUser(null))
  }

  if (user === null) {
    return (
      <Container>
        <div>
          <Notification />
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div>
        <Switch>
          <Route path="/blogs/:id">
            <Notification />
            <Menu/><br></br>
            {`${user.name} logged in`}{' '}
            <Button variant='contained' color='primary' onClick={logOutHandler}>log out</Button>
            <br></br>
            <h2>blog app</h2>
            <BlogView addLike={addLike} removeBlog={removeBlog} refreshBlogs={refreshBlogs}/>
          </Route>
          <Route path="/users/:id">
            <Notification />
            <Menu/>
            <br></br>
            {`${user.name} logged in`}{' '}
            <Button variant='contained' color='primary' onClick={logOutHandler}>log out</Button>
            <br></br>
            <h2>blog app</h2>
            <UserView/>
          </Route>
          <Route path="/users">
            <Notification />
            <Menu/>
            <br></br>
            {`${user.name} logged in`}{' '}
            <Button variant='contained' color='primary' onClick={logOutHandler}>log out</Button>
            <br></br>
            <h2>blog app</h2>
            <UsersTable/>
          </Route>
          <Route path="/">
            <div>
              <Notification />
              <Menu/>
              <br></br>
              {`${user.name} logged in`}{' '}
              <Button variant='contained' color='primary' onClick={logOutHandler}>log out</Button>
              <br></br>
              <h2>blog app</h2>
              <div>
                <Togglable ref={blogFormRef}>
                  <BlogsForm addBlog={addBlog} />
                </Togglable>
              </div>
              <br></br>
              <ShowBlogs
                removeBlog={removeBlog}
                addLike={addLike} />
            </div>
          </Route>
        </Switch>
      </div>
    </Container>
  )
}


export default App
