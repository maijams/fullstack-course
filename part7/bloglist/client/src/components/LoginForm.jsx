import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setUser } from '../reducers/userReducer'
import { setNotificationWithTimeOut } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { Navigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.loggedUser)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotificationWithTimeOut('wrong username or password', 'red', 5))
    }
  }

  if (user) {
    return (<Navigate replace to="/" />)
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          username:
          <Form.Control value={username} onChange={(event) => setUsername(event.target.value)} id="username" />
          password:
          <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} id="password" />
          <Button type="submit" id="login-button">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}


export default LoginForm
