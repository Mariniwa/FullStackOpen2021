import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const resultBooks = useQuery(ALL_BOOKS)
  const resultUser = useQuery(ME)

  if (!resultBooks.data) {
    return <div>loading...</div>
  }

  const booksFromQuery = resultBooks.data.allBooks

  if (resultUser.loading) {
    return <div>loading...</div>
  }
  if (!resultUser.data.me) {
    return null
  }
  const userFavoriteGenre = resultUser.data.me.favoriteGenre

  const booksFiltered = booksFromQuery.filter((book) =>
    book.genres.find((oneGenre) => oneGenre === userFavoriteGenre)
  )

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <strong>{userFavoriteGenre}</strong>
      </div>
      <br></br>
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
    </div>
  )
}

export default Recommend
