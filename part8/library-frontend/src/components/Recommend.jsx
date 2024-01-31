import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)
  const genre = user.data.me.favoriteGenre

  if (!props.show || books.loading ) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <strong>{genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks
            .filter((b) => genre === 'all genres' || b.genres.includes(genre))
            .map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
