import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    padding: '20px',
  },
  errorIcon: {
    fontSize: '4rem',
    color: 'red',
  },
  errorMessage: {
    marginTop: '10px',
    fontSize: '1.5rem',
  },
  backButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.errorIcon}>404</div>
      <div style={styles.errorMessage}>
        Oops! Page not found.
      </div>
      <div>
        The page you are looking for might have been removed or is temporarily unavailable.
      </div>
      <Link to="/" style={styles.backButton}>Back to Home</Link>
    </div>
  );
};

export default ErrorPage;
