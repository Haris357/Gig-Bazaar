/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
// import logo from '../img/Just_logo_transparent.png';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../img/development.png'
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <img src={logo} width={30} alt="Logo" />
          <a className="navbar-brand">
            <span className='green' ><b>D e V</b></span>
            <span className='black' ><b> e </b></span>
            <span className='lightgreen' ><b> R s E</b></span>
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
              <Stack direction="row" spacing={1}>
                <li className="nav-item">
                  <Link>
                    <Button size='small' color='success' ><b>Find Work</b></Button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link>
                    <Button color='success' size='small' ><b>Find Talent</b></Button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link>
                    <Button color='success' size='small' ><b>Why Deverse</b></Button>
                  </Link>
                </li>
              </Stack>
            </ul>
            <form className="d-flex" role="search">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                <Stack direction='row' spacing={2} >
                <li className="nav-item">
                    <Link to="/usersignin">
                      <Button color='success' size='small' variant='outlined' ><b>SignIn</b></Button>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/usersignup">
                      <Button color='success' variant='contained' size='small' ><b>Sign Up</b></Button>
                    </Link>
                </li>
                </Stack>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
