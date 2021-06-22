import React, { useState } from 'react';

//REACT-BOOTSTRAP

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

//IMAGES
import logo from '../assets/images/logo.png';

import LoginModal from './LoginModal';

export default function NavigationBar(props) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navbarStyle = {
    backgroundColor: '#fff159',
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = async (email, password) => {
    console.log(email, password);

    const url = 'http://localhost:8000/auth';

    const params = {
      email,
      password,
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    console.log(data);
  };

  return (
    <>
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
              <Button onClick={handleLoginClick}>Iniciar sesión</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <LoginModal
        show={showLoginModal}
        handleCloseLoginModal={handleCloseLoginModal}
        handleLogin={handleLogin}
      />
    </>
  );
}
