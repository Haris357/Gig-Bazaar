/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/development.png';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Navbar = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <img src={logo} width={30} alt="Logo" />
          <a className="navbar-brand">
            <span className='green'><b>D e V </b></span>
            <b>E</b>
            <span className='lightgreen'><b> R s E</b></span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Stack direction="row" spacing={0}>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeButton === 'home' ? 'active' : ''}`}
                    to="/"
                    onClick={() => handleButtonClick('home')}
                  >
                    <Button><b>Home</b></Button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeButton === 'about' ? 'active' : ''}`}
                    to="/about"
                    onClick={() => handleButtonClick('about')}
                  >
                    <Button><b>About</b></Button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeButton === 'contact' ? 'active' : ''}`}
                    to="/contact"
                    onClick={() => handleButtonClick('contact')}
                  >
                    <Button><b>Contact</b></Button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeButton === 'login' ? 'active' : ''}`}
                    to="/login"
                    onClick={() => handleButtonClick('login')}
                  >
                    <Button><b>SignIn</b></Button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeButton === 'signup' ? 'active' : ''}`}
                    to="/signup"
                    onClick={() => handleButtonClick('signup')}
                  >
                    <Button><b>SignUp</b></Button>
                  </Link>
                </li>
              </Stack>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="button">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
