import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

interface ILoggedInState {
  isLoggedIn: boolean;
}

export default function Header() {
  const isLoggedIn = false;
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>
          <h2>TICKETING</h2>
        </Navbar.Brand>
        <Navbar.Toggle />
        <h4>
          <Nav className='justify-content-end' activeKey='/home'>
            {isLoggedIn && (
              <Nav.Item>
                <Nav.Link href='/'>My Orders</Nav.Link>
              </Nav.Item>
            )}
            {isLoggedIn && (
              <Nav.Item>
                <Nav.Link eventKey='link-1'>Sign Out</Nav.Link>
              </Nav.Item>
            )}
            {isLoggedIn && (
              <Nav.Item>
                <Nav.Link eventKey='link-2'>Sign In</Nav.Link>
              </Nav.Item>
            )}
            {!isLoggedIn && (
              <Nav.Item>
                <Nav.Link href='/create'>Create Account</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </h4>
      </Container>
    </Navbar>
  );
}
