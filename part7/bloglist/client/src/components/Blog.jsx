import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotificationWithTimeOut } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
  const [detailedView, setDetailedView] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetailedView = () => {
    setDetailedView(!detailedView)
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

  if (!detailedView) {
    return (
      <div style={blogStyle} id="min-view">
        {blog.title} {blog.author} <button onClick={toggleDetailedView}>view</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle} id="detailed-view">
        {blog.title} {blog.author} <button onClick={toggleDetailedView}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={like}>like</button>
        <br />
        {blog.user.name}
        <br />
        {blog.user.username === user.username && <button onClick={removeBlog}>remove</button>}
      </div>
    )
  }
}

export default Blog
