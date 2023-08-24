import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Deverse = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: '#4CAF50', 
        padding: '20px',
        borderRadius: '10px',
        transition: 'background-color 0.3s, transform 0.3s',
        '&:hover': {
          backgroundColor: '#45a049', 
          transform: 'scale(1.02)', 
        },
      }}
    >
      <Typography variant="h4" component="h1" color="white" gutterBottom>
      <strong className='green'>D e V e R s E</strong>
      {/* <span><strong className='green' >D e V </strong><strong className='black' > e </strong><strong className='lightgreen' > R s E</strong></span> */}
      </Typography>
      <Typography variant="h6" color="white">
       Empowering Collaboration, Redefining Work. Harnessing the potential of decentralization, Deverse revolutionizes freelancing. Direct connections, lower fees, enhanced security – all on a global, censorship-resistant platform. Join us in shaping a new era of work and collaboration.
      </Typography>
    </Container>
  );
};

export default Deverse;
