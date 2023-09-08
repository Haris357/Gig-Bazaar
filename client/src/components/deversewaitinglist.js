import React, { useRef } from 'react';
import { Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import logo from '../img/DeverseVideo.mp4';
import deverselogo from '../img/blockchain.png';
import deverselogo1 from '../img/Deverse.png';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeverseWaitingList = () => {

  const [loading, setLoading] = useState(false);
  const deverseRef = useRef(null);
  const joinRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [join,setJoin] = useState({
    designation:"",firstname:"",lastname:"",email:"",password:"",location:""
  });
  const [message,setMessage] = useState({
    name:"",email:"",description:""
  });

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = ['name', 'email'];
    const emptyFields = requiredFields.filter((fieldId) => {
      const field = document.getElementById(fieldId);
      return !field || !field.value.trim();
    });
  
    if (emptyFields.length > 0) {
      toast.error('Please fill both fields.');
      return;
    }
  
    setLoading(true);
  
    try {
      const { name, email } = join;
      
      // Make a fetch request to check if the email already exists on the server
      const res = await fetch("/deversewaitinglist/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
  
      const data = await res.json();
  
      if (data.error === "Email Already Exist") {
        toast.error('Email already exists. Please use a different email.');
      } else {
        // Email does not exist, proceed with adding to waiting list
        const resAddUser = await fetch("/deversewaitinglist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
          }),
        });
  
        const dataAddUser = await resAddUser.json();
  
        if (dataAddUser.message === "Added for WaitingList") {
          toast.success('Email Added Successfully.');
          setJoin({ ...join, name: '', email: '' });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  
  const handleMessageSubmit = async (e) => {
    const requiredFields = ['mname', 'memail','mdescription'];
    const emptyFields = requiredFields.filter((fieldId) => {
      const field = document.getElementById(fieldId);
      return !field || !field.value.trim();
    });

    if (emptyFields.length > 0) {
      toast.error('Please fill all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);

    e.preventDefault();
    const {name,email,description} = message;
    const res = await fetch("/deversecontact",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        name,email,description
      })
    });

    const data = await res.json();
    if(data.status === 422 || !data){
      toast.error('Something went wrong');
    }
    else{     
      toast.success('Message Sent SuccessFull');
      setMessage({ ...message, name: '' , email: '',description:''});

    }

  };

  const handleInputsJoin = (event) => {
    const { name, value } = event.target;
    setJoin((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleInputsMessage = (event) => {
    const { name, value } = event.target;
    setMessage((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <Container className='p-4'>
        <Grid container spacing={2} >
          <Grid item xs={12} md={12} >
            <Typography variant='h5' >
              <img width={100} src={deverselogo1} alt=''></img>
              <span className='green' ><b>D e V</b></span>
              <span className='black' ><b> e </b></span>
              <span className='lightgreen' ><b> R s E</b></span>
            </Typography>
            <Button
              variant="contained"
              style={{ backgroundColor: 'white', color: 'green', margin: '5px' }}
              onClick={() => scrollToSection(deverseRef)}
            >
              <strong>Deverse</strong>
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: 'white', color: 'green', margin: '5px' }}
              onClick={() => scrollToSection(joinRef)}
            >
              <strong>Join Community</strong>
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: 'white', color: 'green', margin: '5px' }}
              onClick={() => scrollToSection(aboutRef)}
            >
              <strong>About</strong>
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: 'white', color: 'green', margin: '5px' }}
              onClick={() => scrollToSection(contactRef)}
            >
              <strong>Contact</strong>
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container className='p-4' >
      <Grid container spacing={1}  >
        <section ref={deverseRef}>
          <Container maxWidth="lg" className="p-4 title">
            <div className="shadow-lg p-3 bg-white rounded">
              <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                  <Typography variant='h4' className="animated-heading" style={{ color: 'green', marginBottom: '20px', transition: 'color 0.3s ease-in-out', animation: 'fadeIn 2s ease' }}>
                    <strong>Unlocking the Future of Work: Decentralized Talent, Limitless Opportunities.</strong>
                  </Typography>
                  <Typography variant='h6' style={{ marginBottom: '1rem' }}>
                    Establishing a decentralized network that links companies and freelancers to make it easier and more efficient to discover and offer services.
                  </Typography>
                  <Typography variant='h6' >
                    Become a member of our community to take charge of your career development.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <img src={deverselogo} width={250} alt='' />
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>
        <section ref={joinRef}>
          <Container maxWidth="lg" className="p-4 title">
            <div className="shadow-lg p-3 bg-white rounded">
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Grid item xs={12} md={12} >
                    <Typography variant='h4' style={{ color: 'green', marginBottom: '50px', transition: 'color 0.3s ease-in-out', animation: 'fadeIn 2s ease' }}><strong>Join the Deverse Revolution Today!</strong></Typography>
                  </Grid>
                  <Grid item xs={12} md={12} >
                    <TextField variant='outlined' onChange={handleInputsJoin} value={join.name} id='name' fullWidth color='success' size='small' label='Full Name' name='name' style={{ marginBottom: '10px' }} />
                  </Grid>
                  <Grid item xs={12} md={12} >
                    <TextField variant='outlined' onChange={handleInputsJoin} value={join.email} id='email' fullWidth color='success' size='small' label='Email' name='email' style={{ marginBottom: '20px' }} />
                  </Grid>
                  <Grid item xs={12} md={12}>
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
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onClick={handleJoinSubmit}
                    >
                      {loading ? (
                        <CircularProgress size={20} style={{ position: 'absolute' }} />
                      ) : (
                        <PersonIcon style={{ marginRight: '0.5rem' }} />
                      )}
                      {loading ? 'Joining...' : 'Join'}
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  <video autoPlay loop muted playsInline width="100%">
                    <source src={logo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>
        <section ref={aboutRef}>
          <Container maxWidth="lg" className="p-4 title" >
            <div className="shadow-lg p-3 bg-white rounded">
              <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                  <Grid item xs={12} md={12} >
                    <Typography variant='h4' style={{ color: 'green', marginBottom: '20px', transition: 'color 0.3s ease-in-out', animation: 'fadeIn 2s ease' }}><strong>What is Deverse?</strong></Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography>
                      Deverse, at its core, is a pioneering Web3 blockchain platform that redefines the way freelancers and clients connect. We've harnessed the potential of blockchain technology to create a secure and decentralized ecosystem, seamlessly integrated with MetaMask. For freelancers seeking work and clients in pursuit of top-tier talent, Deverse offers an innovative space for these connections to flourish.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12} >
                    <Typography>
                      It's important to note that Deverse is currently under active development. What truly distinguishes Deverse is our exclusive acceptance of Ethereum for all transactions, ensuring full transparency and efficient payments. By choosing Deverse, you're not only engaging with a platform; you're joining a movement that's shaping the very future of work and talent discovery. Step into the decentralized era with Deverse and embark on a journey that promises boundless opportunities in the realms of freelancing and talent acquisition. Stay tuned as we continue to evolve and enhance our platform to better serve you.
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                  <img width={250} src={deverselogo1} alt='' />
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>
        <section ref={contactRef}>
          <Container maxWidth="lg" className="p-4 title" >
            <div className="shadow-lg p-3 bg-white rounded">
              <Grid container spacing={3} >
                <Grid item xs={12} md={6}>
                  <Grid item xs={12} md={12}>
                    <Typography variant='h4' style={{ color: 'green', marginBottom: '20px', transition: 'color 0.3s ease-in-out', animation: 'fadeIn 2s ease' }}><strong>Contact</strong></Typography>
                  </Grid>   
                  <br/>      
                  <Grid item xs={12} md={12} >
                    <Typography>We'd be thrilled to hear from you! We love hearing from our community, whether you have a question, a recommendation, or you simply want to say hi.</Typography>
                  </Grid>
                  <br/>
                  <Grid item xs={12} md={12} >
                    <Typography><strong>Email: deverse@gmail.com</strong> </Typography>
                  </Grid>
                  <br/>
                  <Grid item xs={12} md={12} >
                    <Typography>Follow us on Social media</Typography>
                  </Grid>
                  <br/>
                  <Grid item xs={12} md={12}>
                    <IconButton>
                      <FacebookIcon />
                    </IconButton>
                    <IconButton>
                      <InstagramIcon />
                    </IconButton>
                    <IconButton>
                      <TwitterIcon />
                    </IconButton>
                    <IconButton>
                      <LinkedInIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Grid item xs={12} md={12}>
                    <Typography variant='h4' style={{ color: 'green', marginBottom: '20px', transition: 'color 0.3s ease-in-out', animation: 'fadeIn 2s ease' }}><strong>Contact Form</strong></Typography>
                  </Grid> 
                  <Grid item xs={12} md={12} >
                    <TextField variant='outlined' id='mname' onChange={handleInputsMessage} value={message.name} fullWidth size='small' color='success' label='Full Name' name='name'></TextField>
                  </Grid>
                  <br/>
                  <Grid item xs={12} md={12} >
                    <TextField variant='outlined' id='memail' onChange={handleInputsMessage} value={message.email} fullWidth size='small' color='success' label='Email' name='email'></TextField>
                  </Grid>
                  <br/>
                  <Grid item xs={12} md={12} >
                    <TextField multiline rows={2} id='mdescription' onChange={handleInputsMessage} value={message.description} variant='outlined' fullWidth size='small' color='success' label='Description' name='description'></TextField>
                  </Grid>   
                  <br/> 
                  <Grid item xs={12} md={12} >
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
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onClick={handleMessageSubmit}
                    >
                      {loading ? (
                        <CircularProgress size={20} style={{ position: 'absolute' }} />
                      ) : (
                        <PersonIcon style={{ marginRight: '0.5rem' }} />
                      )}
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>    
                </Grid>
              </Grid>
            </div>
          </Container>
        </section>
      </Grid>
      </Container>
      <ToastContainer/>
    </>
  );
};

export default DeverseWaitingList;
