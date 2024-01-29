import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotificationWithTimeOut } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'


const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    toggleVisibility()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotificationWithTimeOut(
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
        'green',
        3,
      ))
    } catch (error) {
      dispatch(setNotificationWithTimeOut(error.response?.data.error || 'An error occurred', 'red', 3))
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>

      <Form onSubmit={addBlog}>
        <div>
          title:
          <Form.Control value={title} onChange={(event) => setTitle(event.target.value)} id="title" />
        </div>
        <div>
          author:
          <Form.Control value={author} onChange={(event) => setAuthor(event.target.value)} id="author" />
        </div>
        <div>
          url:
          <Form.Control value={url} onChange={(event) => setUrl(event.target.value)} id="url" />
        </div>
        <Button type="submit" id="create-blog-button">
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
