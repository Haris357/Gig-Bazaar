/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Container, Paper, Tabs, Tab, Button, Typography, Box, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {useNavigate} from 'react-router-dom';

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
const About = () => {
  const [tabValue, setTabValue] = useState(0);
  const [userData,setUserData] = useState('');
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAttachButtonClick = () => {
    console.log("Attach button clicked");
  };
  const navigate = useNavigate();
  const callAboutPage = async ()=>{
    try {
      const res = await fetch('/about',{
        method:"GET",
        headers: {
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data = await res.json();
      setUserData(data);
      if(res.status !== 200){
        const error = new Error(res.error);
        throw error;
      }
      
    } catch (error) {
      console.log(error)
      navigate('/Login');
    }
  }
  useEffect(() => {
    callAboutPage();
  },[])
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', alignItems: 'center' }}>
        <div>
          <div style={{position: 'relative',width: '100px',height: '100px',borderRadius: '50%',overflow: 'hidden',display: 'flex',justifyContent: 'center',alignItems: 'center',backgroundColor: 'gray',}}>
            <IconButton aria-label="attach" htmlFor="attach-input" component="label" style={{padding: '4px',backgroundColor: 'rgba(0, 0, 0, 0.5)',color: 'white',borderRadius: '50%',}}>
              <AttachFileIcon fontSize="small" />
              <input type="file" id="attach-input" style={{ display: 'none' }} onChange={handleAttachButtonClick}/>
            </IconButton>
          </div>
          <Typography variant="h6" sx={{ mt: 2 }}>

          </Typography>
          <Typography variant="subtitle1"></Typography>
        </div>
        <div style={{ flex: 1 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {userData.name}
          </Typography>
          <Tabs value={tabValue} onChange={handleTabChange} textColor="primary">
            <Tab label="About" />
            <Tab label="Timeline" />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <Typography>Email: {userData.email}</Typography>
            <Typography>Location: {userData.location}</Typography>
            <Typography>_id: {userData._id}</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
          <Typography></Typography>         
          </TabPanel>
        </div>       
        {/* Right side: Edit Profile Button */}
        <div>
          <Button variant="outlined" sx={{ textTransform: 'none' }}>
            Edit Profile
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default About;
