import React, { useState, useEffect } from 'react';
import { Grid, Container, Divider, List, ListItem, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Web3Wallet from '../components/Web3Wallet';

const UserSettings = () => {
  const [userData, setUserData] = useState({});
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const UserCall = async () => {
    try {
      const res = await fetch('/about', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      setUserData(data);
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    UserCall();
  }, []);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleSubMenuClick = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <Container maxWidth='lg' className='p-5'>
      <div className='shadow-lg p-3 mb-5 bg-white rounded'>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                border: '2px solid #fff',
              }}
            >
              <PersonIcon fontSize='large' />
            </Avatar>
            <br />
            <h4>{userData.firstname} {userData.lastname}</h4>
          </Grid>
          <Divider />
          <Grid container spacing={0}>
            <Grid item xs={12} md={4}>
              <List>
                <ListItem button onClick={handleSubMenuClick}>
                  <ListItemText primary="Your Work" />
                  {subMenuOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button>
                      <ListItemText primary="Sub Menu Item 1" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="Sub Menu Item 2" />
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem button onClick={() => handleMenuClick('menu1')}>
                  <ListItemText primary="Bill & Payment Method" />
                </ListItem>
                <ListItem button onClick={() => handleMenuClick('menu2')}>
                  <ListItemText primary="Menu 2" />
                </ListItem>
                <ListItem button onClick={() => handleMenuClick('menu3')}>
                  <ListItemText primary="Menu 3" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={8}>
              {selectedMenu === 'menu1' && (
                <Grid container spacing={0}>
                  <Container className='p-2'>
                    <Web3Wallet />
                  </Container>
                </Grid>
              )}
              {selectedMenu === 'menu2' && (
                <div>
                  <h2>Menu 2 Content</h2>
                </div>
              )}
              {selectedMenu === 'menu3' && (
                <div>
                  <h2>Menu 3 Content</h2>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default UserSettings;
