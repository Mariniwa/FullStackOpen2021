import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { FILTER_BOOKS, UNIQUE_GENRES } from '../queries'

const Books = (props) => {
  const [booksToFilter, result] = useMutation(FILTER_BOOKS)
  const uniqueGenresQuery = useQuery(UNIQUE_GENRES)
  const [genre, setGenre] = useState('all genres')
  const [booksFiltered, setBooksFiltered] = useState([])

  const filterGenre = async (ge) => {
    setGenre(ge)
    await booksToFilter({ variables: { genre: ge } })
  }

  useEffect(() => {
    const fetchBooks = async () => {
      if (result.data) {
        setBooksFiltered(result.data.filterBooks)
      }
    }
    fetchBooks()
  }, [result.data])

  useEffect(() => {
    filterGenre('all genres')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (uniqueGenresQuery.loading) {
    return <div>loading...</div>
  }

  if (!result.data) {
    <></>
  }

  const uniqueGenres = uniqueGenresQuery.data.uniqueGenres

  if (!props.show) {
    return null
  }

  if (booksFiltered) {
    return (
      <div>
        <h2>books</h2>
        in genre <strong>{genre}</strong>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksFiltered.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {uniqueGenres.map((ge) => (
          <button key={ge} onClick={() => filterGenre(ge)}>
            {ge}
          </button>
        ))}
        <button onClick={() => filterGenre('all genres')}>all genres</button>
      </div>
    )
  }
  return <div></div>
}

export default Books
