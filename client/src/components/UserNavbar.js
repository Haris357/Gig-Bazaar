/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import logo from '../img/development.png'
import { TextField,IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const UserNavbar = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handlesignout = () => {
        window.location.href = '/UserSignOut';

    }

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <img src={logo} width={30} alt="Logo" />
                <a className="navbar-brand">
                    <span className='green' ><b>D e V</b></span>
                    <span className='black' ><b> e </b></span>
                    <span className='lightgreen' ><b> R s E</b></span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link size='small' className='nav-link' to="/Jobposting"><b>Find Work</b></Link>
                    </li>
                </ul>
                <form className="d-flex">
                <TextField
                className="search-input"
                placeholder="Search"
                variant="outlined"
                size="small"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                className="search-button"
                                color="success"
                                aria-label="search"
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                />

                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className="nav-item">
                            <IconButton
                                aria-controls="navbar-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <AccountCircleIcon />
                            </IconButton>
                            <Menu
                                id="navbar-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <Link to='/UserProfile' ><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
                                <Link to='/UserSettings' ><MenuItem onClick={handleClose}>Settings</MenuItem></Link>
                                <MenuItem disabled>
                                    <hr className="dropdown-divider" />
                                </MenuItem>
                                <MenuItem onClick={handlesignout} href="/UserSignOut">Sign Out</MenuItem>
                            </Menu>
                        </li>
                    </ul>
                </form>
                </div>
            </div>
        </nav>
    </>
  )
}

export default UserNavbar
