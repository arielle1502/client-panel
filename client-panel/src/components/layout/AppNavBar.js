import React, { Fragment } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const AppNavBar = () => {
  
  const loggedIn = (
    <Fragment>
      <Nav.Link href="/">Dashboard</Nav.Link>
      <Nav.Link href="/#!">Email</Nav.Link>
      <Nav.Link href="/#!">Logout</Nav.Link>
    </Fragment>
  );
  
  const loggedOut = (
    <Nav.Link href="/login">Login</Nav.Link>
  )
  
  return (
    <Navbar bg="primary" expand='md' variant='dark' className='mb-4'>
      <Navbar.Brand href='/'>Client Panel</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { loggedIn }
          { loggedOut }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AppNavBar;