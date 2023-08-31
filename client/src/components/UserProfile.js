/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Grid, Container, Divider, List, ListItem, ListItemText, Collapse,Modal, TextField, Button } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { ToastContainer, toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    work: '',
    workHeading: '',
    workSpecialization: '',
    hourlyRate: '',
    workDescription: '',
    firstname: '',
    _id: '',
    designation: '',
  });
  
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
      setUserData({ ...userData, _id:userData._id, firstname:userData.firstname, designation:userData.designation })
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

  const UserProfileWork = async (e) =>{
    e.preventDefault();
    const { work,workHeading, workSpecialization,hourlyRate,workDescription,firstname,_id,designation}  = userData;
    const res = await fetch('/UserProfileWork',{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        work,workHeading, workSpecialization,hourlyRate,workDescription,_id,firstname,designation
      })
    })

    const data = await res.json();
    if(!data){
      toast.error('something went wrong');
    } else {
      toast.success('User Profile Work Updated Successfully')
      setUserData({ ...userData,work:"",workHeading:"", workSpecialization:"",hourlyRate:"",workDescription:""})
    }

  }

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleSubMenuClick = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const handleOpenModal = () => {
  setOpenModal(true);
};

const handleCloseModal = () => {
  setOpenModal(false);
};

const handleInputs = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  setUserData({...userData,[name]:value});
}

  return (
    <>
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>Add Work</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseModal}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {/* <DialogContentText>Add Your Work</DialogContentText> */}
        <Grid container spacing={2}>
          <Grid item xs={6} > 
            <TextField size='small' onChange={handleInputs} value={userData.work} fullWidth variant='outlined' label='Work Name' name='work'></TextField>
          </Grid>
          <Grid item xs={6} > 
            <TextField size='small' onChange={handleInputs} value={userData.workHeading} fullWidth variant='outlined' label='Work Title' name='workHeading'></TextField>
          </Grid>
          <Grid item xs={6} > 
            <TextField size='small' onChange={handleInputs} value={userData.workSpecialization} fullWidth variant='outlined' label='Work Specialization' name='workSpecialization'></TextField>
          </Grid>
          <Grid item xs={6} > 
            <TextField size='small' onChange={handleInputs} value={userData.hourlyRate} fullWidth variant='outlined' label='Hourly Rate' name='hourlyRate'></TextField>
          </Grid>
          <Grid item xs={12} > 
            <TextField size='small' onChange={handleInputs} fullWidth variant='outlined' value={userData.workDescription} label='Work Description' name='workDescription'></TextField>
          </Grid>
          <Grid item xs={12} >
            <Button size='small' color='success' variant='contained' onClick={UserProfileWork} fullWidth >
              Update Work Profile
            </Button>
          </Grid>
          {/* Add your content here */}
        </Grid>
      </DialogContent>
    </Dialog>
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
                <ListItemText primary="All Work" />
                {subMenuOpen ? <ExpandLess /> : <ExpandMore />}
                <IconButton
                  onClick={handleOpenModal}
                  style={{
                    border: '2px solid green', // Replace 'green' with your desired success color
                    borderRadius: '50%',
                    padding: 4, // Adjust this value as needed
                  }}
                >
                  <AddIcon style={{ color: 'green' }} /> {/* Replace 'green' with your desired success color */}
                </IconButton>
              </ListItem>
              
              <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {userData.UserProfileWork && userData.UserProfileWork.map((profile, index) => (
                    <ListItem button key={index}>
                      <ListItemText primary={profile.workHeading} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
                <ListItem button onClick={() => handleMenuClick('menu1')}>
                  <ListItemText primary="Menu 1" />
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
                <div>
                  <h2>Menu 1 Content</h2>
                </div>
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
    <ToastContainer/>
    </>
  );
};

export default UserProfile;
