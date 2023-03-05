import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, Container, Button } from 'react-bootstrap/';
import styles from './Header.module.css';


function PublicNav() {
  return (
    <nav>
      <Navbar bg='transparent' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>CareerMate</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='#'>About</Nav.Link>
            <Nav.Link as={Link} to='#'>Contact</Nav.Link>
          </Nav>
          <Nav>
          <Button as={Link} to='/login' variant='primary'>Post a Job</Button>{' '}
          <Button as={Link} to='/register' className={styles.btnjob} variant='success'>Want a Job</Button>{' '}
          </Nav>
          
        </Container>
      </Navbar>
    </nav>

  )
}

export default PublicNav
