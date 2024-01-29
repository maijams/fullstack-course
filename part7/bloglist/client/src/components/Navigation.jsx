import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import { setNotificationWithTimeOut } from '../reducers/notificationReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.loggedUser)

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      dispatch(setUser(null))
    } catch (exception) {
      dispatch(setNotificationWithTimeOut('error logging out', 'red', 5))
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user
              ? <>{user.name} logged in <Button onClick={handleLogout}>logout</Button></>
              : <Link to="/login">login</Link>
            }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation