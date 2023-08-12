import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Container, Grid, Paper, CircularProgress } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send'; // Import the SendIcon from Material-UI

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendClick = () => {
    setIsLoading(true);
    // Simulate an API call or processing time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="contact-root">
      <Container maxWidth="lg" className="contact-container">
        <Paper elevation={3} className="shadow-lg rounded">
          <div className="p-3">
          <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Paper elevation={3} className="card-panel p-3">
                  <Card className="card">
                    <CardContent>
                      <PhoneIcon className="card-icon" />
                      <Typography variant="subtitle1" className="card-heading">
                        Phone Number
                      </Typography>
                      <Typography className="card-text">+1234567890</Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper elevation={3} className="card-panel p-3">
                  <Card className="card">
                    <CardContent>
                      <EmailIcon className="card-icon" />
                      <Typography variant="subtitle1" className="card-heading">
                        Email
                      </Typography>
                      <Typography className="card-text">contact@example.com</Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper elevation={3} className="card-panel p-3">
                  <Card className="card">
                    <CardContent>
                      <LocationOnIcon className="card-icon" />
                      <Typography variant="subtitle1" className="card-heading">
                        Address
                      </Typography>
                      <Typography className="card-text">123 Main St, City</Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
            </Grid>

            <div className="contact-form" style={{ marginTop: '20px' }}>
              <Paper elevation={3} className="form-panel p-3">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Phone Number" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Email" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Address" fullWidth multiline />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Message" fullWidth multiline />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={`send-button ${isLoading ? 'loading' : ''}`}
                      onClick={handleSendClick}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#007BFF';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#1976D2';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CircularProgress size={20} style={{ position: 'absolute' }} />
                      ) : (
                        <SendIcon style={{ marginRight: '0.5rem' }} />
                      )}
                      {isLoading ? 'Sending...' : 'Send'}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Contact;
