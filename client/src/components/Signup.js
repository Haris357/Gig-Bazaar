/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import SignUpBG from '../img/SignUpbg.jpg';
import { useNavigate  } from 'react-router-dom'

const PasswordStrengthBar = ({ strength }) => {
  const getBarStyle = (strength) => {
    switch (strength) {
      case 'strong':
        return { width: '100%', backgroundColor: 'green' };
      case 'medium':
        return { width: '70%', backgroundColor: 'yellow' };
      case 'weak':
        return { width: '30%', backgroundColor: 'red' };
      default:
        return { width: '0%', backgroundColor: 'transparent' };
    }
  };

  return <div style={{ height: '5px', borderRadius: '5px', ...getBarStyle(strength) }} />;
};

const Signup = () => {

  const [numberValue, setNumberValue] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/\D/g, '');
    const truncatedValue = sanitizedValue.slice(0, 11);
    setNumberValue(truncatedValue);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Check for focus on password field before updating the password match state
    if (isPasswordFocused) {
      setDoPasswordsMatch(newPassword === confirmPassword);
    }
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
    setDoPasswordsMatch(password === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setDoPasswordsMatch(password === newConfirmPassword);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrength = () => {
    const length = password.length;
    if (length >= 13) {
      return 'strong';
    } else if (length >= 10) {
      return 'medium';
    } else {
      return 'weak';
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    e.preventDefault();
    const {name,email,phone,work,password} = user;
    const res = await fetch("/register",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        name,email,phone,work,password
      })
    });

    const data = await res.json();
    if(data.status === 422 || !data){
      window.alert("Invalid Registration")
      console.log("Invalid Registration")
    }
    else{
    window.alert("Registration Successful")
    console.log("Registration Successful")}
      navigate("/login");
  };

  const [user,setUser] = useState({
    name:"",email:"",phone:"",work:"",password:""
  })

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
};

  return (
    <div style={{ backgroundImage: `url(${SignUpBG})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm" className="p-5">
        <div className="shadow-lg p-3 mb-5 bg-white rounded">
          <div className='row'>
            <div className='col'>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12}>
                  <TextField fullWidth label="Name" value={user.name} name="name" onChange={handleInputs} id="Name" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email" id="Email" name="email" onChange={handleInputs} value={user.email} variant="outlined" required />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Phone No." id="PhoneNo" variant="outlined" name="phone"  onChange={(e) => {handleInputChange(e);handleInputs(e);}} value={numberValue && user.phone} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Designation" id="designation" name="work" onChange={handleInputs} variant="outlined" value={user.work} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth name="password" label="Password"id="password"variant="outlined"type={showPassword ? 'text' : 'password'}value={password && user.password}onChange={(e) =>{handlePasswordChange(e); handleInputs(e); }  }onFocus={handlePasswordFocus}onBlur={handlePasswordBlur}error={isPasswordFocused && password.length < 8}helperText={isPasswordFocused && password.length < 8 ? "Password should be at least 8 characters long." : null}/>
                  {password && (
                    <>
                    <hr/>
                      <PasswordStrengthBar strength={getPasswordStrength()} />
                      <div style={{ fontSize: '12px', color: getPasswordStrength() === 'strong' ? 'green' : 'red' }}>
                        {getPasswordStrength()}
                      </div>
                    </>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Confirm Password" id="confirmPassword" variant="outlined" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={handleConfirmPasswordChange} error={!doPasswordsMatch && confirmPassword !== ''} />
                  <FormControlLabel control={<Switch checked={showPassword} onChange={handleTogglePasswordVisibility} />} label={showPassword ? 'Hide Password' : 'Show Password'} />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(1)', transition: 'all 0.3s ease-in-out', position: 'relative' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#007BFF'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#1976D2'; e.currentTarget.style.transform = 'scale(1)'; }} disabled={loading}>
                    {loading ? (<CircularProgress size={20} style={{ position: 'absolute' }} />) : (<SaveIcon style={{ marginRight: '0.5rem' }} />)}{loading ? 'Creating...' : 'Create'}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
