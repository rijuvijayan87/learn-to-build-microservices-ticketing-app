import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>
          <h2>TICKETING</h2>
        </Navbar.Brand>
        <Navbar.Toggle />
        <h4>
          <Nav className='justify-content-end' activeKey='/home'>
            <Nav.Item>
              <Nav.Link href='/home'>Signin</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='link-1'>My Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='link-2'>Signout</Nav.Link>
            </Nav.Item>
          </Nav>
        </h4>
      </Container>
    </Navbar>
  );
}
