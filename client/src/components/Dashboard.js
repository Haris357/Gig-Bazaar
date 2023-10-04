import { Container, Grid, IconButton, Typography, Badge } from '@mui/material';
import React, { useState, useEffect } from 'react';
import InboxIcon from '@mui/icons-material/Inbox';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  const UserCall = async () => {
    try {
      const res = await fetch('/about', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      setUserData(data);

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
      const userId = data._id;

      const notificationCountResponse = await fetch(`/notifications/count/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const notificationCountData = await notificationCountResponse.json();
      setNotificationCount(notificationCountData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    UserCall();
  }, []);

  const notify = () =>{
    navigate('/Notifications');
    }

  return (
    <>
      <Container maxWidth="xl">
        <div className="shadow-lg p-3 mb-5 bg-white">
          <Grid container spacing={1}>
            <Grid item xs={12} md={11}>
              <Typography>Your Dashboard {userData.firstname}</Typography>
            </Grid>
            <Grid item xs={12} md={1}>
            {notificationCount >= 0 && (
                <Badge badgeContent={notificationCount} color="error">
                    <IconButton onClick={notify}>
                    <InboxIcon />
                    </IconButton>
                </Badge>
                )}
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
