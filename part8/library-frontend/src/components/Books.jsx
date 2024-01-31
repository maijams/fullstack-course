import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const genres = useQuery(ALL_GENRES)
  const [genre, setGenre] = useState('all genres')

  if (!props.show || books.loading || genres.loading) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre}</strong>
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

      {genres.data.allGenres.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      ))}
      <button onClick={() => setGenre('all genres')}>all genres</button>
    </div>
  )
}

export default Books
