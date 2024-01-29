import { useDispatch, useSelector } from 'react-redux'
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotificationWithTimeOut } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user.loggedUser)
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const like = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    try {
      dispatch(likeBlog(blog.id, blogObject))
    }
    catch (error) {
      dispatch(setNotificationWithTimeOut(error.response?.data.error || 'An error occurred', 'red', 3))
    }
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotificationWithTimeOut('Blog removed', 'green', 3))
      } catch (error) {
        dispatch(setNotificationWithTimeOut(error.response?.data.error || 'An error occurred', 'red', 3))
      }
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    try {
      dispatch(commentBlog(blog.id, comment))
    } catch (error) {
      dispatch(setNotificationWithTimeOut(error.response?.data.error || 'An error occurred', 'red', 3))
    }
  }

  return (
    <div id="detailed-view">
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      likes {blog.likes} <Button onClick={like}>like</Button>
      <br />
      added by {blog.user.name}
      <br />
      {blog.user.username === user.username && <Button onClick={removeBlog}>remove</Button>}
      <br />
      <br />
      <h4>Comments</h4>
      <Form onSubmit={addComment}>
        <Form.Control name="comment" id="comment" />
        <Button type="submit" id="add-comment-button"> add comment </Button>
      </Form>
      <ul>
        {blog.comments.map((comment) => <li key={comment}>{comment}</li>)}
      </ul>
    </div>
  )
}


export default Blog
