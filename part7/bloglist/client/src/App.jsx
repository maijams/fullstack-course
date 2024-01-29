import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes, useMatch } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { getAllUsers, initializeUser } from './reducers/userReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import BlogList from './components/BlogList'
import Navigation from './components/Navigation'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const user = useSelector((state) => state.user.loggedUser)
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.user.allUsers)

  const matchBlog = useMatch('/blogs/:id')

  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const matchUser = useMatch('/users/:id')

  const userToShow = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  return (
    <div className="container">
      <Navigation />

      <h2>blog app</h2>
      <Notification />

      {!user && <Navigate replace to='/login' />}

      <Routes>
        <Route path="/blogs/:id" element={blog ? <Blog blog={blog} /> : <Navigate replace to='/' />} />
        <Route path="/users" element={user ? <UserList /> : <Navigate replace to="/login" />} />
        <Route path="/users/:id" element={userToShow ? <User user={userToShow} /> : <Navigate replace to='users' />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App
