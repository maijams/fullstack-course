import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotificationWithTimeOut } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      await blogService.create(blogObject)
      dispatch(setNotificationWithTimeOut(
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
        'green',
        3,
      ))
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    } catch (error) {
      dispatch(setNotificationWithTimeOut(error.response?.data.error || 'An error occurred', 'red', 3))
    }
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        dispatch(setNotificationWithTimeOut('Blog removed', 'green', 3))
      } catch (error) {
        dispatch(setNotificationWithTimeOut(error.response?.data.error || 'An error occurred', 'red', 3))
      }
    }
  }

  const updateLikes = async (blogId, blogObject) => {
    try {
      await blogService.update(blogId, blogObject)
      setBlogs(
        blogs.map((blog) => (blog.id === blogId ? { ...blog, likes: blog.likes + 1 } : blog)),
      )
    } catch (error) {
      dispatch(setNotificationWithTimeOut(error.response?.data.error || 'An error occurred', 'red', 3))
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotificationWithTimeOut('wrong username or password', 'red', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (exception) {
      dispatch(setNotificationWithTimeOut('error logging out', 'red', 5))
    }
  }

  if (user === null) {
    return <div>{loginForm()}</div>
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      {blogForm()}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            user={user}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  )
}

export default App
