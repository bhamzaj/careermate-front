import React from 'react'
import { Link } from 'react-router-dom'
import './Header.module.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../lib/store/slices/authSlice'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function UserNav({ user }) {
  const dispatch = useDispatch()
  return (
    <nav><Navbar bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand href="/">CareerMate</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Nav.Link as={Link} to="/jobs">{user.role === 'EMPLOYER' ? 'Published Jobs' : 'Job Applications'}</Nav.Link>

        </Nav>
        <Navbar.Text>Welcome {user.firstName + ' ' + user.lastName} |</Navbar.Text>
        <Nav>
          <Nav.Link onClick={() => {
            dispatch(logout())
          }} >Logout</Nav.Link>
        </Nav>


      </Container>
    </Navbar></nav>
  )
}

export default UserNav
