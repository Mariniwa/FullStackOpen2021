import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { badNotificationChange } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const CommentForm = ({ blog, refreshBlogs }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const commentSubmit = async (event) => {
    event.preventDefault()
    if (comment === '') {
      dispatch(badNotificationChange('You must write a comment'))
      return
    }
    const commentObject = {
      comment: comment
    }
    await blogService.addComment(blog.id, commentObject)
    refreshBlogs()
    setComment('')
  }

  return(
    <form onSubmit={commentSubmit}>
      <input
        id="comment"
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></input>
      <button type="submit" id='commentButton'>add comment</button>
    </form>
  )
}

export default CommentForm