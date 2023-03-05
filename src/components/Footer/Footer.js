import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap/';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


import styles from './Footer.module.css'

const Footer = () => {
  const token = useSelector((state) => state.auth.value.token);
  return (
    <div className={styles.footer}>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href="#home">CareerMate</Navbar.Brand>
          <Navbar.Text>© 2023 All Rights Reserved</Navbar.Text>

          {!token&&<Nav>
            <Nav.Link as={Link} to='/register'>Sign Up</Nav.Link>
            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
          </Nav>}

        </Container>
      </Navbar></div>)
}

export default Footer
