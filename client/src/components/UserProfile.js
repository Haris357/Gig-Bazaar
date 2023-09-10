/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Grid, Container, Divider, List, ListItem, ListItemText, Collapse, TextField, Button, Typography } from '@mui/material';
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
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Skeleton from '@mui/material/Skeleton'; // Import Skeleton
import Web3 from 'web3';


const UserProfile = () => {
  const [userData, setUserData] = useState({});

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    UserCall();
  }, []);
  const [userWork,setUserWork] = useState({ 
    work: '',
    workHeading: '',
    workSpecialization: '',
    hourlyRate: '',
    workDescription: '',
    userID:'',
  });
  const UserProfileWork = async (e) => {
    e.preventDefault();
    const updatedUserWork = { ...userWork, userID: userData._id };
  
    const { work, workHeading, workSpecialization, hourlyRate, workDescription } = updatedUserWork;
  
    const res = await fetch('/UserProfileWork', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        work, workHeading, workSpecialization, hourlyRate, workDescription, userID: updatedUserWork.userID
      })
    })
  
    const data = await res.json();
    if (!data) {
      toast.error('Something went wrong');
    } else {
      toast.success('User Profile Work Updated Successfully');
      setUserWork({ ...updatedUserWork, work: "", workHeading: "", workSpecialization: "", hourlyRate: "", workDescription: "" });
    }
  }
  
  const [userProfileData, setUserProfileData] = useState([]);

  const fetchUserProfileWorkData = async () => {
    try {
      if (!userData || !userData._id) {
        return;
      }
      const response = await fetch(`/GetUserProfileWork/${userData._id}`);
      const data = await response.json();
      if (!response.ok) {
        console.error('Error fetching user profile work data');
      } else {
        setUserProfileData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProfileWorkData();
  }, [userData]);

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
    setUserWork({ ...userWork, [name]: value });
  }

  const [ethValue, setEthValue] = useState('');
  const [ethToUsdRate, setEthToUsdRate] = useState(null);

  const handleEthChange = (event) => {
    const input = event.target.value;

    if (/^\d*\.?\d*$/.test(input)) {
      setEthValue(input);
    }
  };

  const fetchEthereumPrice = async () => {
    try {
      const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      const ethPriceInUSD = data.ethereum.usd;
      setEthToUsdRate(ethPriceInUSD);
    } catch (error) {
      console.error('Error fetching Ethereum price:', error);
    }
  };

  useEffect(() => {
    fetchEthereumPrice();
  }, []);

  const calculateUsdValue = () => {
    const ethAmount = parseFloat(ethValue);
    if (!isNaN(ethAmount) && ethToUsdRate !== null) {
      return (ethAmount * ethToUsdRate).toFixed(2);
    }
    return '';
  };

  const [selectedUserProfile, setSelectedUserProfile] = useState(null);

  const handleUserProfileDataClick = (item) => {
    setSelectedUserProfile(item);
  };

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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField size='small' onChange={handleInputs} value={userWork.work} fullWidth variant='outlined' label='Work Name' name='work'></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField size='small' onChange={handleInputs} value={userWork.workHeading} fullWidth variant='outlined' label='Work Title' name='workHeading'></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField size='small' onChange={handleInputs} value={userWork.workSpecialization} fullWidth variant='outlined' label='Work Specialization' name='workSpecialization'></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
            <div>
              <TextField
                label="Hourly Rate"
                size='small'
                fullWidth
                value={ethValue && userWork.hourlyRate}
                name="hourlyRate"
                onChange={(event) => {
                  handleEthChange(event);
                  handleInputs(event);
                }}
                InputProps={{
                  inputProps: {
                    pattern: /^\d*\.?\d*$/,
                  },
                }}
              />
              <div>
                {ethValue && ethToUsdRate !== null && (
                  <p>
                    {ethValue} Ethereum is approximately ${calculateUsdValue()} USD
                  </p>
                )}
              </div>
            </div>
            </Grid>
            <Grid item xs={12}>
              <TextField size='small' onChange={handleInputs} fullWidth variant='outlined' value={userWork.workDescription} label='Work Description' name='workDescription'></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button size='small' color='success' variant='contained' onClick={UserProfileWork} fullWidth >
                Update Work Profile
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Container maxWidth='lg' className='p-5'>
        <div className='shadow-lg p-3 mb-5 bg-white rounded'>
          {isLoading ? ( // Display skeleton while loading
            <Skeleton variant="rect" height={200} />
          ) : (
            <Grid container spacing={2}>
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
                <Typography variant="h5" component="div">
                  <strong>{`${userData.firstname} ${userData.lastname}`}</strong>
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon style={{ color: 'lightgrey' }} />
                  <Typography>{userData.location}</Typography>
                </div>
                <br />
              </Grid>
            </Grid>
          )}
          <Divider />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Container maxWidth='sm' className='p-1' >
                <div className='shadow-sm p-3 bg bg-white rounded'>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Typography>View Profile</Typography>
                    <IconButton
                      onClick={handleOpenModal}
                      style={{
                        border: '2px solid lightgrey',
                        borderRadius: '50%',
                        padding: 4,
                      }}
                      aria-label="Add Work"
                    >
                      <AddIcon style={{ color: 'green' }} />
                    </IconButton>
                    <IconButton
                      onClick={handleOpenModal}
                      style={{
                        border: '2px solid lightgrey',
                        borderRadius: '50%',
                        padding: 4,
                      }}
                      aria-label="Edit Work"
                    >
                      <EditIcon style={{ color: 'green' }} />
                    </IconButton>
                  </div>
                  {isLoading ? ( // Display loading skeleton for list items
                    <>
                      <Skeleton variant="text" height={30} />
                      <Skeleton variant="text" height={30} />
                      <Skeleton variant="text" height={30} />
                      <Skeleton variant="text" height={30} />
                    </>
                  ) : (
                    <List>
                      <ListItem button onClick={handleSubMenuClick}>
                        <ListItemText primary="All Work" />
                        {subMenuOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      {Array.isArray(userProfileData) && userProfileData.length > 0 ? (
                        <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {userProfileData.map((item) => (
                              <ListItem
                                key={item._id}
                                button
                                onClick={() => {
                                  handleUserProfileDataClick(item);
                                  setSelectedMenu(item.work);
                                }}
                              >
                                <ListItemText primary={item.work} />
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      ) : null}
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
                  )}
                </div>
              </Container>
            </Grid>
            <Grid item xs={12} md={8}>
              <Container maxWidth='lg' className='p-1'>
                <div className='shadow-sm p-3 mb-5 bg-white rounded'>
                  {isLoading ? ( // Display loading skeleton for menu content
                    <>
                      <Skeleton variant="text" height={40} width="80%" />
                      <Skeleton variant="text" height={20} width="60%" />
                      <Skeleton variant="text" height={20} width="70%" />
                    </>
                  ) : (
                    <>
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
                     {selectedUserProfile && selectedMenu === selectedUserProfile.work && (
                        <div>
                          <h2>{selectedUserProfile.workHeading}</h2>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Container>
            </Grid>
          </Grid>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default UserProfile;
