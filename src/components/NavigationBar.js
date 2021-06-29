import React, { useState } from 'react';

//REACT-BOOTSTRAP

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

//IMAGES
import logo from '../assets/images/logo.png';

import { Link } from 'react-router-dom';

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
      credentials: 'include',
    });

    const data = await response.json();

    if (response.status === 200) {
      props.updateUser({ name: data.data });

      handleCloseLoginModal();
    } else {
      alert(data.message);
    }
    console.log(data);
  };

  const handleLogout = async () => {
    const url = 'http://localhost:8000/auth';

    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    });

    const data = response.json();

    if (response.status === 200) {
      props.updateUser(null);
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <Navbar style={navbarStyle} expand="lg">
        <Link to="/">
          <Navbar.Brand href="#home">
            <img src={logo} />
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {props.user ? (
              <>
                <Link to="/mispublicaciones" className="nav-link">
                  Mis publicaciones
                </Link>
                <Link to="/favoritos" className="nav-link">
                  Favoritos
                </Link>

                <NavDropdown
                  alignRight
                  title={props.user.name}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">
                    Mi cuenta
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={handleLogout}>
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
