import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import CommentForm from './CommentForm'

const BlogView = ({ addLike, removeBlog, refreshBlogs }) => {
  const user = useSelector(state => state.loggedInUser)
  const match = useRouteMatch('/blogs/:id')
  const blogs = useSelector(state => state.blogs)
  const matchedBlog = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null
  const blog = matchedBlog
  const addLikeHandler = async () => await addLike(blog)
  const removeBlogHandler = async () => await removeBlog(blog)
  const showButton = {
    display:
      JSON.stringify(blog.user[0].username) === JSON.stringify(user.username)
        ? ''
        : 'none',
  }
  let commentIndex=-1
  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={`http://${blog.url}`}>{blog.url}</a>
      <br></br>
      {blog.likes} likes <button
        id="likesButton"
        onClick={addLikeHandler}
        className="likeButton"
      >
            like
      </button>
      <br></br>
      added by {blog.user[0].name}
      <br></br>
      <button style={showButton} onClick={removeBlogHandler}>
          remove
      </button>

      <h2>comments</h2>
      <CommentForm blog={blog} refreshBlogs={refreshBlogs}/>
      <ul>
        {blog.comments.map(comment => {
          commentIndex++
          return(
            <li key={commentIndex}>{comment}</li>
          )
        })}
      </ul>
    </div>
  )
}



export default BlogView