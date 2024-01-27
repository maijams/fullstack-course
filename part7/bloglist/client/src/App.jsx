import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationWithTimeOut } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, setUser } from './reducers/userReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const toggleVisibility = () => {
    const togglableComponent = blogFormRef.current
    togglableComponent.toggleVisibility()
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm toggleVisibility={toggleVisibility} />
    </Togglable>
  )

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      dispatch(setUser(null))
    } catch (exception) {
      dispatch(setNotificationWithTimeOut('error logging out', 'red', 5))
    }
  }

  if (user === null) {
    return <div>{loginForm()}</div>
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      {blogForm()}

      {sortedBlogs.map((blog) => (<Blog key={blog.id} blog={blog} />))}
    </div>
  )
}

export default App
