import { useSelector } from 'react-redux'
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const blogFormRef = useRef()

  const toggleVisibility = () => {
    const togglableComponent = blogFormRef.current
    togglableComponent.toggleVisibility()
  }

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 7,
  }

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>
      <br/>
      {sortedBlogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id} >
          <div style={blogStyle}>
            {blog.title} {blog.author}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default BlogList