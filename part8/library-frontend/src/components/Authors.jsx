import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [authorName, setAuthorName] = useState(null)
  const [born, setBorn] = useState('')

  const authors = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [
      { query: ALL_AUTHORS },
    ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  if (!props.show || authors.loading) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: authorName, setBornTo: parseInt(born) } })

    setAuthorName(null)
    setBorn('')
  }

  const options = authors.data.allAuthors.map((a) => ({ value: a.name, label: a.name }))

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
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select
          key={authorName}
          value={options.find((opt) => opt.value === authorName)}
          onChange={(selectedOption) => setAuthorName(selectedOption.value)}
          options={options}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
