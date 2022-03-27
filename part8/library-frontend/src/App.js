import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { useSubscription, useApolloClient } from '@apollo/client'
import Recommend from './components/Recommend'
import { BOOK_ADDED, UNIQUE_GENRES } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('user-token'))
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      const bookGenres = addedBook.genres
      window.alert(`book "${addedBook.title}" added`)

      client.cache.updateQuery({ query: UNIQUE_GENRES }, ({ uniqueGenres }) => {
        let genresArray = uniqueGenres.concat(bookGenres)
        return {
          uniqueGenres: Array.from(new Set(genresArray))
        }
      })
    }
  })

  const logout = () => {
    localStorage.clear()
    setToken('')
    client.resetStore()
    setPage('login')
  }

  if (token)
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={logout}>logout</button>
        </div>
        <Authors show={page === 'authors'} token={token}/>
        <Books show={page === 'books'} />
        <Recommend show={page === 'recommend'} />
        <NewBook show={page === 'add'} />
      </div>
    )
  else
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />
        <LoginForm page={page} setPage={setPage} setToken={setToken} />
      </div>
    )
}

export default App
