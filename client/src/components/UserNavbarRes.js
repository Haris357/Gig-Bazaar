import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Button,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../img/development.png'

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = (
    <div>
      <List>
        {/* Add your navigation items here */}
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Services" />
        </ListItem>
      </List>
      <List>
        {/* Add additional icon buttons here */}
        <ListItem button>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static" style={{ background: 'white', color: 'black' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <img src={logo} width={30} alt="Logo" />
            <span className='green' ><b>D e V</b></span>
            <span className='black' ><b> e </b></span>
            <span className='lightgreen' ><b> R s E</b></span>
            <Hidden smDown>
             <Button color="success" size='small' >Find Work</Button>
            </Hidden>
          </Typography>
          
          {/* Display the menu icon button only in responsive mode */}
          <Hidden smUp>
            <IconButton color="inherit" onClick={toggleDrawer} edge="end">
              <MenuIcon />
            </IconButton>
          </Hidden>
          {/* Display the navigation items and icon buttons on AppBar when not in responsive mode */}
          <Hidden smDown>
            
            <IconButton color="success">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Hidden>
          <IconButton color="success">
              <AccountCircleIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
      {/* Display the menu items in the sidebar when toggled */}
      <Drawer open={open} onClose={toggleDrawer}>
        {menuItems}
      </Drawer>
    </div>
  );
};

export default Navbar;
