import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import SignIn from '../img/login.png';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Container maxWidth="sm" className="p-5">
        <div className="shadow-lg p-3 mb-5 bg-white rounded">
          <div className="row">
            <div className="col">
              <Grid item xs={12}>
                <TextField fullWidth label="Email" id="Email" variant="outlined" required value={email} onChange={(e) => setEmail(e.target.value)}/>
              </Grid>
              <br />
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="Password"
                  variant="outlined"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showPassword}
                      onChange={handleTogglePasswordVisibility}
                    />
                  }
                  label="Show Password"
                />            
              </Grid>
              <Grid item xs={12} >
              <strong>Don't have an Account?</strong><Link className="nav-link" to="/signup">Sign Up</Link>    
              </Grid>
              <br />
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'scale(1)',
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#007BFF';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#1976D2';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={20} style={{ position: 'absolute' }} />
                  ) : (
                    <PersonIcon style={{ marginRight: '0.5rem' }} />
                  )}
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Grid>
            </div>
            <div className="col">
              <img src={SignIn} width={200} alt="Sign In"></img>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
