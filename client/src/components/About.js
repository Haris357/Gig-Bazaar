import React, { useState } from 'react';
import { Container, Paper, Tabs, Tab, Button, Typography, Box, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAttachButtonClick = () => {
    // Handle the file selection process here
    // For now, you can log a message to indicate the button was clicked
    console.log("Attach button clicked");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', alignItems: 'center' }}>
        {/* Left side: Photograph and Name */}
        <div>
          <div
            style={{
              position: 'relative',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'gray', // You can replace this with your photograph
            }}
          >
            <IconButton
              aria-label="attach"
              htmlFor="attach-input"
              component="label"
              style={{
                padding: '4px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                borderRadius: '50%',
              }}
            >
              <AttachFileIcon fontSize="small" />
              <input
                type="file"
                id="attach-input"
                style={{ display: 'none' }}
                onChange={handleAttachButtonClick}
              />
            </IconButton>
          </div>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Haris Imran
          </Typography>
          <Typography variant="subtitle1">Software Developer</Typography>
        </div>
        {/* Center: About and Timeline Tabs */}
        <div style={{ flex: 1 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            About Me
          </Typography>
          <Tabs value={tabValue} onChange={handleTabChange} textColor="primary">
            <Tab label="About" />
            <Tab label="Timeline" />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            {/* Content for About tab */}
            {/* Add your About content here */}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {/* Content for Timeline tab */}
            <Typography variant="body1">
              {/* Add your timeline paragraph here */}
            </Typography>
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
