const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

/*const totalLikes = (blogs) => {
  const blogLikes = blogs.map(blog => blog.likes)
  return blogs.length === 0
    ? 0
    : blogLikes.reduce((sum, likes) => {
      return sum + likes
    }, 0)
}*/

const totalLikes = (blogs) => _.sumBy(blogs, blog => blog.likes)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const blogMaxLikes = Math.max(...blogs.map(blog => blog.likes))
  const selectedBlog = blogs.find(blog => blog.likes === blogMaxLikes)
  return (
    {
      title: selectedBlog.title,
      author: selectedBlog.author,
      likes: selectedBlog.likes
    }
  )
}

const mostBlogs = (blogs) => {
  //const authorsCount = blogs.reduce((acc, blog) => ({ ...acc, [blog.author]: acc[blog.author] ? acc[blog.author] + 1 : 1 }), {})
  const authorsCount = _.countBy(blogs, (blog) => blog.author)
  /*const maxNumber = Math.max(...Object.values(authorsCount))
  const maxAuthor = Object.keys(authorsCount).find(author => authorsCount[author] === maxNumber)
  return { author: maxAuthor, blogs: maxNumber }*/
  const pairs = Object.keys(authorsCount).map(author => ({ author: author, blogs: authorsCount[author] }))
  if (blogs.length !== 0) return _.maxBy(pairs, (pair) => pair.blogs)
  return 0
}

const mostLikes = (blogs) => {
  //const authorsLikes = _.countBy(blogs.likes, blog => blog.author) !!!!!!!!!!!!!NO FUNCIONA!!!!!!!!!!
  const authorsLikes = blogs.reduce((acc, blog) => (
    {
      ...acc, [blog.author]: acc[blog.author] ? acc[blog.author] + blog.likes : blog.likes
    }
  ), {})
  /*const maxNumber = Math.max(...Object.values(authorsLikes))
  const maxAuthor = Object.keys(authorsLikes).find(author => authorsLikes[author] === maxNumber)
  if (blogs.length !== 0)
    return {
      author: maxAuthor,
      likes: maxNumber
    }
  return 0*/
  const pairs = Object.keys(authorsLikes).map(author => ({
    author: author,
    likes: authorsLikes[author]
  }))
  if (blogs.length !== 0) {
    return _.maxBy(pairs, pair => pair.likes)
  }
  return 0
}

/*const mostLikes2 = (blogs) => {
  if (blogs.length === 0) return 0
  const blogsByAuthor = _.groupBy(blogs, blog => blog.author)
  const likesAndAuthors = Object.keys(blogsByAuthor)
    .map(author => ({ author: author, likes: _.sumBy(blogsByAuthor[author], blog => blog.likes) }))
  return _.maxBy(likesAndAuthors, pair => pair.likes)
}*/

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}