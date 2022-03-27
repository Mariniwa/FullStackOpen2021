const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const blogPromiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(blogPromiseArray)
  await User.deleteMany()
  const userObjects = helper.initialUsers.map((user) => new User(user))
  const userPromiseArray = userObjects.map((user) => user.save())
  await Promise.all(userPromiseArray)
})

describe('testing that blog api works correctly', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect('Content-Type', /application\/json/)
  })
  test('blogs have the correct array length', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(helper.initialBlogs.length)
  })
  test('blogs have the property id, and not _id ', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body[0].id).toBeDefined()
    expect(result.body[0]._id).toBe(undefined)
  })
  test('method POST correctly saves a new note to the database', async () => {
    const newUser = {
      username: 'skt5',
      name: 'faker',
      password: '12345',
    }
    await api.post('/api/users').send(newUser)
    const loginResult = await api.post('/api/login').send({
      username: 'skt5',
      password: '12345',
    })
    const newAuthorization = `bearer ${loginResult.body.token.toString()}`
    const newBlog = {
      title: 'testingFaker',
      author: 'lee heon',
      url: 'http://skt.com',
      likes: 30,
      __v: 0,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: newAuthorization })
    const resultRefresh = await helper.blogsInDb()
    expect(resultRefresh).toHaveLength(helper.initialBlogs.length + 1)
    const titles = resultRefresh.map((body) => body.title)
    expect(titles).toContain('testingFaker')
  })
  test('if likes property is missing, it defaults to 0', async () => {
    const newUser = {
      username: 'skt5',
      name: 'faker',
      password: '12345',
    }
    await api.post('/api/users').send(newUser)
    const loginResult = await api.post('/api/login').send({
      username: 'skt5',
      password: '12345',
    })
    const newAuthorization = `bearer ${loginResult.body.token.toString()}`
    const newBlog = {
      title: 'testingFaker',
      author: 'lee heon',
      url: 'http://skt.com',
      __v: 0,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: newAuthorization })
    const resultRefresh = await helper.blogsInDb()
    const allBlogsLikes = resultRefresh.map((body) => body.likes)
    const thisBlogLikes = allBlogsLikes[helper.initialBlogs.length]
    expect(thisBlogLikes).toBe(0)
  })
  test('if title or url property is missing, return 400 bad request', async () => {
    const newUser = {
      username: 'skt5',
      name: 'faker',
      password: '12345',
    }
    await api.post('/api/users').send(newUser)
    const loginResult = await api.post('/api/login').send({
      username: 'skt5',
      password: '12345',
    })
    const newAuthorization = `bearer ${loginResult.body.token.toString()}`
    const newBlog = {
      author: 'lee heon',
      url: 'http://skt.com',
      __v: 0,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: newAuthorization })
    await api.post('/api/blogs').send(newBlog).expect(400)
  })
  test('adding a blog fails with status code 401 Unauthorized if a token is not provided.', async () => {
    const newUser = {
      username: 'skt5',
      name: 'faker',
      password: '12345',
    }
    await api.post('/api/users').send(newUser)
    await api.post('/api/login').send({
      username: 'skt5',
      password: '12345',
    })
    const newBlog = {
      title: 'testingFaker',
      author: 'lee heon',
      url: 'http://skt.com',
      __v: 0,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: null })
      .expect(401)
  })
  test('blog deletes correctly', async () => {
    await helper.blogsInDb()
    const newUser = {
      username: 'skt5',
      name: 'faker',
      password: '12345',
    }
    await api.post('/api/users').send(newUser)
    const loginResult = await api.post('/api/login').send({
      username: 'skt5',
      password: '12345',
    })
    const newAuthorization = `bearer ${loginResult.body.token.toString()}`
    const newBlog = {
      title: 'testingFaker',
      author: 'lee heon',
      url: 'http://skt.com',
      likes: 30,
      __v: 0,
    }
    const blogCreated = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: newAuthorization })
    await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogCreated.body.id}`)
      .set({ Authorization: newAuthorization })
    const blogsAfterDeleting = await helper.blogsInDb()
    const blogsAfterDeletingIds = blogsAfterDeleting.map((blog) => blog.id)
    expect(blogsAfterDeleting).toHaveLength(helper.initialBlogs.length)
    expect(blogsAfterDeletingIds).not.toContain(blogCreated.id)
  })
  test('blog UPDATES and overwrites itself correctly', async () => {
    const blogsAtTheMoment = await helper.blogsInDb()
    const blogToUpdate = blogsAtTheMoment[0]
    const newBlog = {
      title: 'updating a blog',
      url: 'workscorrectly.com',
    }
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200)
    const blogsAfterUpdating = await helper.blogsInDb()
    expect(blogsAfterUpdating).toHaveLength(helper.initialBlogs.length)
    const blogsMappedToUrls = blogsAfterUpdating.map((blog) => blog.url)
    expect(blogsMappedToUrls).toContain('workscorrectly.com')
  })
  test('invalid user is NOT created into mongodb and returns proper error', async () => {
    await helper.usersInDb()
    const newUser = {
      username: 'pakiter',
      name: 'paco',
      password: '123',
    }
    await api.post('/api/users').send(newUser).expect(400)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    const usernamesMapped = usersAtEnd.map((user) => user.username)
    expect(usernamesMapped).not.toContain(['pakiter', 'pakiter'])
  })
  test('invalid password is NOT created (minimum 3 characters)', async () => {
    const newUser = {
      username: 'pedrito',
      name: 'pedro',
      password: '12',
    }
    await api.post('/api/users').send(newUser).expect(400)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    const usernamesMapped = usersAtEnd.map((user) => user.username)
    expect(usernamesMapped).not.toContain('pedrito')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
