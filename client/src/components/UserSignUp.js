import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GoogleIcon from '../img/google.png';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import freelancer from '../img/freelancer.png';
import client from '../img/client.png';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const UserSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('None');
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [user,setUser] = useState({
    designation:"",firstname:"",lastname:"",email:"",password:"",location:""
  });

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const requiredFields = ['first-name', 'email'];
    const emptyFields = requiredFields.filter((fieldId) => {
      const field = document.getElementById(fieldId);
      return !field || !field.value.trim();
    });

    if (emptyFields.length > 0) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    e.preventDefault();
    const {designation,firstname,lastname,email,password,location} = user;
    const res = await fetch("/signup",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
       designation,firstname,lastname,email,password,location
      })
    });

    const data = await res.json();
    if(data.status === 422 || !data){
      toast.error('Something went wrong');
    }
    else{     
      toast.success('Registration SuccessFull')
      setTimeout(() => {
        navigate("/UserSignIn");
      }, 3000);
    }

  };

  const handleGoogleButtonClick = () => {
    toast.warning('This feature is under development.');
  };

  const handleCardButtonClick = (designation) => {
    setSelectedOption(designation);
  };

  const handleSetAndClose = () => {
    if (selectedOption === 'None') {
      toast.warning('Please Select Your Desired Designation');
    } else {
      const tempSelectedOption = selectedOption;
      setSelectedOption(tempSelectedOption);
      setUser((prevUser) => ({
        ...prevUser,
        designation: tempSelectedOption,
      }));
      setOpenModal(false);
      console.log(tempSelectedOption);
    }
  };
  const hidemodal = () =>{
    setOpenModal(false);
    navigate('/');
  }
  const login = () => {
    navigate('/UserSignIn');
  }
  return (
    <>
      <Dialog open={openModal} onClose={handleSetAndClose}>
      <DialogTitle>Select Your Designation</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={hidemodal}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText>Choose your designation to proceed:</DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card
              variant={selectedOption === 'Freelancer' ? 'outlined' : 'elevation'}
              onClick={() => handleCardButtonClick('Freelancer')}
              sx={{
                border: selectedOption === 'Freelancer' ? '4px solid green' : 'none',
                borderRadius: '10px',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Freelancer"
                  image={freelancer}
                />
                <CardContent>
                  <Typography variant="h6">
                    <strong>Freelancer</strong>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              variant={selectedOption === 'Client' ? 'outlined' : 'elevation'}
              onClick={() => handleCardButtonClick('Client')}
              sx={{
                border: selectedOption === 'Client' ? '4px solid green' : 'none',
                borderRadius: '10px',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Client"
                  image={client}

                />
                <CardContent>
                  <Typography variant="h6">
                    <strong>Client</strong>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '16px',
            }}
          >
            <Button
              variant="contained"
              color="success"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'scale(1)',
                transition: 'all 0.3s ease-in-out',
                position: 'relative',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#45a049';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#4CAF50';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onClick={handleSetAndClose}
            >
              {selectedOption === 'Freelancer'
                ? 'Join as Freelancer'
                : selectedOption === 'Client'
                ? 'Join as Client'
                : 'Select Your Designation'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <h6>Already have an account? </h6>
              <h6
                type="button"
                className="text text-success"
                onClick={login}
              >
                Log In
              </h6>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
      <Container maxWidth="sm" className="p-5">
        <div
          className="shadow-lg p-3 bg-white rounded"
          style={{ backgroundColor: '#f5f5f5', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="row">
            <div className="col">
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12}>
                {selectedOption === 'Freelancer' ? (
                  <div style={{ textAlign: 'center', fontSize: '14px', color: '#555' }}>
                    <h3><strong>SignUp to find work</strong></h3>
                  </div>
                ) : selectedOption === 'Client' ? (
                  <div style={{ textAlign: 'center', fontSize: '14px', color: '#555' }}>
                    <h3><strong>SignUp to hire talent</strong></h3>
                  </div>
                ) : null}
                <br/>
                <Button
                  onClick={handleGoogleButtonClick}
                  variant="outlined"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.3s ease-in-out',
                    border: '1px solid #000000',
                    fontSize: '16px',
                    marginBottom: '10px',
                  }}
                >
                  <img src={GoogleIcon} width={18} alt="Google"></img>
                  <span> Continue with Google</span>
                </Button>
                <Grid item xs={12}>                
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
                    <div style={{ margin: '0 10px', color: '#555' }}>OR</div>
                    <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
                  </div>
                </Grid>
                </Grid>             
                <Grid item xs={12}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="First Name"
                      variant="outlined"
                      id="first-name"
                      value={user.firstname}
                      name='firstname'
                      onChange={handleInputs}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="Last Name"
                      variant="outlined"
                      id="last-name"
                      value={user.lastname}
                      name='lastname'
                      onChange={handleInputs}

                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email"
                    variant="outlined"
                    id="email"
                    value={user.email}
                    name='email'
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    id="password"
                    value={user.password}
                    name='password'
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Location"
                    variant="outlined"
                    id="location"
                    value={user.location}
                    name='location'
                    onChange={handleInputs}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      borderRadius: '10px',
                      padding: '10px 20px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.3s ease-in-out',
                      border: '1px solid transparent',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                      fontSize: '16px',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#45a049';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#4CAF50';
                    }}
                    onClick={handleSubmit}
                    disabled={loading || selectedOption === 'None'}
                  >
                    {loading ? (
                      <CircularProgress size={20} style={{ position: 'absolute' }} />
                    ) : (
                      <AccountCircleIcon style={{ marginRight: '0.5rem', fontSize: '20px' }} />
                    )}
                    {loading
                      ? 'Creating...'
                      : selectedOption === 'Freelancer'
                      ? 'Join as Freelancer'
                      : selectedOption === 'Client'
                      ? 'Join as Client'
                      : 'Select Designation'}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <div style={{textAlign:'center'}}>
                    <h6>Already have an account? </h6><h6 type='button' className='text text-success' onClick={login} > Log In</h6>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default UserSignUp;
