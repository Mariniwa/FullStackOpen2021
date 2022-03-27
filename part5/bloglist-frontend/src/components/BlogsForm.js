import React from 'react'
import { useState } from 'react'
import {
  TextField,
  Button
} from '@material-ui/core'

const BlogsForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    await addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <div>
        <form onSubmit={blogSubmit}>
          <TextField
            id="title"
            label='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <br></br>
          <TextField
            id="author"
            label="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br></br>
          <TextField
            id="url"
            label="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <br></br>
          <Button variant='contained' color='primary' type="submit" id='submitButton'>create</Button>
        </form>
      </div>
    </div>
  )
}

export default BlogsForm
