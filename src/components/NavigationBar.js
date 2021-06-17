import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from '../assets/images/logo.png';

export default function NavigationBar(props) {
  const navbarStyle = {
    backgroundColor: '#fff159',
  };

  return (
    <Navbar style={navbarStyle} expand="lg">
      <Navbar.Brand href="#home">
        <img src={logo} />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {props.user ? (
            <>
              <Nav.Link href="#home">Mis publicaciones</Nav.Link>
              <Nav.Link href="#link">Favoritos</Nav.Link>

              <NavDropdown
                alignRight
                title={props.user.name}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  Mi cuenta
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href="#action/3.4">
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Button>Iniciar sesión</Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
