import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from 'react-spring';

import { styled } from '@mui/material/styles';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  textAlign: 'center',
  padding: '20px',
});

const ErrorIcon = styled('div')({
  fontSize: '4rem',
  color: 'red',
});

const ErrorMessage = styled(Typography)({
  marginTop: '10px',
  fontSize: '1.5rem',
});


const AnimatedContainer = animated(Container);

const ErrorPage = () => {
  const fadeInProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const slideInProps = useSpring({
    from: { transform: 'translateY(-50px)' },
    to: { transform: 'translateY(0px)' },
    config: { tension: 300, friction: 15 },
  });

  return (
    <AnimatedContainer style={{ ...fadeInProps }}>
      <ErrorIcon><strong>404</strong></ErrorIcon>
      <ErrorMessage variant="h4" style={{ ...slideInProps }}>
       <strong>Oops! Page not found.</strong> 
      </ErrorMessage>
      <br/>
      <Typography style={{ ...slideInProps }}>
       <strong>The page you are looking for might have been removed or is temporarily unavailable.</strong>
      </Typography>
      <br/>    
        <Link to='/' >
          <Button variant="outlined" color="error" >
          Back to Home
          </Button>
        </Link>
    </AnimatedContainer>
  );
};

export default ErrorPage;
