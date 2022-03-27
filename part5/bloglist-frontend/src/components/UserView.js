import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

const UserView = () => {
  const match = useRouteMatch('/users/:id')
  const users = useSelector(state => state.users)
  const matchedUser = match
    ? users.find((user) => user.id === match.params.id)
    : null
  const user = matchedUser
  if (user) {
    return (
      <div>
        <h1>
          {user.name}
        </h1>
        <h2>
        added blogs
        </h2>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>
              {blog.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  else return null
}



export default UserView