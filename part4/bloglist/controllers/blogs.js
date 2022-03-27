const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(result)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).end().json({ error: 'missing title or url field' })
  }
  if (!request.token || !request.user._id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: request.user._id,
    comments: []
  })

  const blogSaved = await blog.save()
  request.user.blogs = request.user.blogs.concat(blogSaved._id)
  await User.findByIdAndUpdate(request.user._id, request.user, { new: true })
  return response.status(201).json(blogSaved.toJSON())
})

blogsRouter.put('/:id/comments', async (request, response) => {
  const body = request.body

  const blogToComment = await Blog.findById(request.params.id)

  const blog = {
    title: blogToComment.title,
    author: blogToComment.author,
    url: blogToComment.url,
    likes: blogToComment.likes,
    user: blogToComment.user,
    comments: blogToComment.comments.concat(body.comment)
  }
  const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.status(200).json(blogUpdated)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  const userIdOfTheBlog = blogToDelete.user.toString()
  if (request.user._id.toString() !== userIdOfTheBlog) {
    return response
      .status(401)
      .json({ error: 'this user didnt create that blog' })
  }
  if (!request.token || !request.user._id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.status(200).json(blogUpdated)
})

module.exports = blogsRouter
