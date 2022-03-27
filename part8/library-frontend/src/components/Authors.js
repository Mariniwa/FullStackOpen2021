import { useQuery } from '@apollo/client'
import BirthyearForm from './BirthyearForm'
import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const resultAuthors = useQuery(ALL_AUTHORS)

  if (resultAuthors.loading) {
    return <div>loading...</div>
  }

  const authors = resultAuthors.data.allAuthors

  if (!props.show) {
    return null
  }

  if (props.token) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <BirthyearForm />
      </div>
    )
  } else
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

export default Authors
