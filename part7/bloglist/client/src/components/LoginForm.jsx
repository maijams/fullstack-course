import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setUser } from '../reducers/userReducer'
import { setNotificationWithTimeOut } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

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

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input value={username} onChange={(event) => setUsername(event.target.value)} id="username" />
        </div>
        <div>
          password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} id="password" />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  )
}


export default LoginForm
