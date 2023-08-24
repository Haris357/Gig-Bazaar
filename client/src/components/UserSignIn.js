/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import GoogleIcon from '../img/google.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
const UserSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    
    const handleGoogleButtonClick = () => {
        toast.warning('This feature is under development.');
      };
      const handleTogglePassword = () => {
        setShowPassword(!showPassword);
      };
    const handleSubmit = async (e) =>{
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 10000);
        e.preventDefault();
        const res = await fetch("/signIn", {
        method: "POST",  
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = res.json();
    if(res.status === 400 || !data){
      toast.error("Invalid Credentials");
    }else{
      toast.success("SignIn Successful");
      setTimeout(() => {
        window.location.href = "/JobPosting";
        const currentURL = window.location.href;
      }, 2000);
    }
    }
    const SignUp = () =>{
        navigate('/');
    }

  return (
    <>
        <Container maxWidth='sm' className='p-5'>
            <div className='shadow-lg p-3 mb-5 bg bg-white rounded' >
                <div className='row' >
                    <div className='col' >
                    <Grid container spacing={3} alignItems="center" >
                        <Grid item xs={12} >
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
                        <Grid item xs={12} >
                            <TextField fullWidth size="small" label="Email" onChange={(e) => setEmail(e.target.value)} variant="outlined" id="email" name='email'/>
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
                                name='password'
                                onChange={(e) => setPassword(e.target.value)}

                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transform: 'scale(1)',
                                    transition: 'all 0.3s ease-in-out',
                                    position: 'relative',
                                    backgroundColor: '#4CAF50',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                                onClick={handleSubmit}
                            >
                                {loading ? (
                                    <CircularProgress size={20} style={{ position: 'absolute' }} />
                                ) : (
                                    <PersonIcon style={{ marginRight: '0.5rem' }} />
                                )}
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Button>
                         </Grid>
                        <Grid item xs={12}>
                            <div style={{textAlign:'center'}}>
                                <h6>Don't have any account? </h6><h6 type='button' className='text text-success' onClick={SignUp} > Sign Up</h6>
                            </div>
                        </Grid>
                    </Grid>
                    </div>
                </div>
            </div>
        </Container>      
      <ToastContainer />

    </>
  )
}

export default UserSignIn
