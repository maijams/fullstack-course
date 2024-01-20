import { useState } from "react"

const Blog = ({ blog }) => {
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
        likes {blog.likes} <button>like</button>
        <br />
        {blog.user.name}
      </div>
    )
  }
}

export default Blog