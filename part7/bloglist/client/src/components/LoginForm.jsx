import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input value={username} onChange={handleUsernameChange} id="username" />
        </div>
        <div>
          password
          <input type="password" value={password} onChange={handlePasswordChange} id="password" />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
