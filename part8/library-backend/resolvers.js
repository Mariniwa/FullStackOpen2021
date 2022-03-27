const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')


const resolvers = {
  Mutation: {
    addBook: async (root, args, context) => {
      const books = await Book.find({}).populate('author')
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      if (books.find((b) => b.title === args.title)) {
        throw new UserInputError('Title must be unique', {
          invalidArgs: args.title,
        })
      }
      if (args.title.length < 2) {
        throw new UserInputError('Title must be at least 2 characters long', {
          invalidArgs: args.title,
        })
      }
      if (!args.title) {
        throw new UserInputError('Title must be provided', {
          invalidArgs: args.title,
        })
      }
      const doesThisAuthorExist = await Author.findOne({ name: args.author })
      if (!doesThisAuthorExist) {
        const author = new Author({
          name: args.author,
          id: uuid(),
          born: null,
          bookCount: 1,
        })
        const book = new Book({ ...args, id: uuid(), author: author })
        await author.save()
        await book.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })
        return book.populate('author')
      } else {
        const author = await Author.findOne({ name: args.author })
        const book = new Book({
          ...args,
          id: uuid(),
          author: { ...author, bookCount: author.bookCount + 1 },
        })
        await book.save()
        await Author.findOneAndUpdate(
          { name: args.author },
          { bookCount: author.bookCount + 1 }
        )
        pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })
        return book.populate('author')
      }
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      if (!args.name) {
        throw new UserInputError('An author name must be provided', {
          invalidArgs: args.name,
        })
      }
      if (!args.setBornTo) {
        throw new UserInputError('Born date must be provided', {
          invalidArgs: args.setBornTo,
        })
      }
      if (author) {
        await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo }
        )
        const authorEdited = await Author.findOne({ name: args.name })
        return authorEdited
      } else return null
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    filterBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      const booksFiltered =
        args.genre === 'all genres'
          ? books
          : books.filter((book) =>
              book.genres.find((oneGenre) => oneGenre === args.genre)
            )
      return booksFiltered
    },
  },
  Query: {
    uniqueGenres: async (root, args) => {
      const books = await Book.find({}).populate('author')
      let allGenres = []
      books.map((book) => book.genres.map((genre) => allGenres.push(genre)))
      const uniqueGenres = Array.from(new Set(allGenres))
      return uniqueGenres
    },
    bookCount: async () => {
      const bookCount = await Book.find({})
      return bookCount.length
    },
    authorCount: async () => {
      const authorCount = await Author.find({})
      return authorCount.length
    },
    allBooks: async (root, args) => {
      const booksToFilter = await Book.find({}).populate('author')
      if (args.author && !args.genre) {
        return booksToFilter.filter((book) => book.author.name === args.author)
      }
      if (args.genre && !args.author) {
        return booksToFilter.filter((book) =>
          book.genres.find((genre) => genre === args.genre)
        )
      }
      if (args.genre && args.author) {
        const genresFiltered = booksToFilter.filter((book) =>
          book.genres.find((genre) => genre === args.genre)
        )
        return genresFiltered.filter((book) => book.author.name === args.author)
      }
      return booksToFilter
    },
    allAuthors: async () => await Author.find({}),
    me: async (root, args, context) => context.currentUser,
  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
    bookCount: (root) => root.bookCount,
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = resolvers