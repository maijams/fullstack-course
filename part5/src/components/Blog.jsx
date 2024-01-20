import { useState } from 'react'


const Blog = ({ blog, updateLikes, user, removeBlog }) => {
  const [detailedView, setDetailedView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetailedView = () => {
    setDetailedView(!detailedView)
  }

  const likeBlog = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    updateLikes(blog.id, blogObject)
  }

  const deleteBlog = () => {
    removeBlog(blog)
  }

  if (!detailedView) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleDetailedView}>view</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleDetailedView}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={likeBlog}>like</button>
        <br />
        {blog.user.name}
        <br />
        {blog.user.username === user.username &&
        <button onClick={deleteBlog}>remove</button>
        }
      </div>
    )
  }
}

export default Blog