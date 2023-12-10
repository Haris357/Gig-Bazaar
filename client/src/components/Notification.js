/* eslint-disable react-hooks/exhaustive-deps */
import { Container, List, ListItem, Typography, Grid, Checkbox, IconButton, Pagination, Divider } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkAsReadIcon from "@mui/icons-material/MarkEmailRead";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { format, differenceInHours, parseISO } from 'date-fns';
import { Skeleton } from "@mui/material";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };
  
  const fetchNotificationsAndData = async () => {
    try {
      setIsLoading(true);
      if (!userData._id) {
        setIsLoading(false);
        return;
      }
  
      const res = await fetch(`/notifications/${userData._id}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch notifications. Status: ${res.status}`);
      }
  
      const data = await res.json();
      setNotifications(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); 
    }
  };
  
  const fetchDevProfileData = async (profileWork, devId) => {
    debugger;
    try {
      const response = await fetch(`/dev-profile/${profileWork}/${devId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = (notification) => {
    setSelectedNotification(notification);
    fetchDevProfileData(notification.proposalId?.profileWork, notification.senderId?._id);
    setOpenDialog(true);
  };


  const UserCall = async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setUserData(data);
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    UserCall();
    fetchNotificationsAndData();
  }, []);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (notificationId) => {
    // Handle individual checkbox change here...
  };

  const handleDelete = () => {
    // Handle delete action here...
  };

  const handleMarkAsRead = () => {
    // Handle mark as read action here...
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchNotificationsAndData();
  }, [userData._id]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  function formatCreatedAt(createdAtString) {
    const createdAt = parseISO(createdAtString);
    const now = new Date();
    const hoursDiff = differenceInHours(now, createdAt);
  
    if (hoursDiff < 12) {
      
      return format(createdAt, 'hh:mm a');
    } else if (hoursDiff < 24) {
      return `${hoursDiff} hours ago`;
    } else {
      return format(createdAt, 'MMM d');
    }
  }

  const getTruncatedCoverLetter = (coverLetter) => {
    if (coverLetter) {
      const words = coverLetter.split(' ');
      if (words.length > 10) {
        return `${words.slice(0, 10).join(' ')}...`;
      }
    }
    return coverLetter;
  };

  return (
    <Container maxWidth="xl" className="p-5">
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
      <Autocomplete
      freeSolo
      size="small"
      id="search-notifications"
      disableClearable
      options={notifications.map((option) => option.message)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Notifications"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
        <List>
          <ListItem>
            <Checkbox
              checked={selectAll}
              onChange={toggleSelectAll}
              color="primary"
            />
            <Typography variant="caption">Select All</Typography>
            <IconButton onClick={handleDelete} disabled={!selectAll}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleMarkAsRead} disabled={!selectAll}>
              <MarkAsReadIcon />
            </IconButton>
          </ListItem>
          {isLoading ? (
    Array.from(new Array(rowsPerPage)).map((_, index) => (
      <ListItem key={index} style={{ marginBottom: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={1}>
            <Skeleton variant="rectangular" width={24} height={24} />
          </Grid>
          <Grid item xs={12} md={2}>
            <Skeleton variant="text" width="80%" />
          </Grid>
          <Grid item xs={12} md={3}>
            <Skeleton variant="text" width="80%" />
          </Grid>
          <Grid item xs={12} md={5}>
            <Skeleton variant="text" width="80%" />
          </Grid>
          <Grid item xs={12} md={1}>
            <Skeleton variant="text" width="80%" />
          </Grid>
        </Grid>
      </ListItem>
    ))
  ) : (
          notifications
            .slice(startIndex, endIndex)
            .map((notification) => (
              <Grid container spacing={1} key={notification._id} onClick={() => handleClickOpen(notification)}>
                <Grid item xs={12}>
                <Container maxWidth='xl' sx={{
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': { 
                  transform: 'scale(1.02)', 
                },
              }}>
                <div className='shadow-lg bg-white rounded' style={{ marginBottom: '1rem' }} >
                    <ListItem>
                      <Grid container spacing={0} >
                          <Grid item xs={12} md={1} >
                          <Checkbox
                            onChange={() =>
                              handleCheckboxChange(notification._id)
                            }
                            color="primary"
                          />
                          </Grid>
                          <Grid item xs={12} md={2} >
                            {notification.senderId && (
                              <Typography variant="subtitle1" ><b>Sended By: {notification.senderId.firstname}</b></Typography>
                            )}
                          </Grid>
                          <Grid item xs={12} md={3} >
                            {notification.jobId && (
                              <Typography variant="subtitle1" ><b>Job: "{notification.jobId.job}"</b></Typography>
                            )}
                          </Grid>
                          <Grid item xs={12} md={5}>
                            {notification.proposalId && (
                              <Typography variant="subtitle1">
                                {getTruncatedCoverLetter(notification.proposalId.coverLetter)}
                              </Typography>
                            )}
                          </Grid>
                          <Grid item xs={12} md={1} >
                            {notification && (
                              <Typography variant="subtitle1" ><b>{formatCreatedAt(notification.createdAt)}</b></Typography>
                            )}
                          </Grid>
                      </Grid>
                    </ListItem>
                  </div>
              </Container>     
                </Grid>
              </Grid>
            ))
            )}
        </List>
        <div className="pagination-container">
          <Pagination
            count={Math.ceil(notifications.length / rowsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
          />
        </div>
      </div>
      <Dialog maxWidth="xl" open={openDialog} onClose={handleClose}>
        <DialogTitle>Notification Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Display the notification details here */}
            {selectedNotification && (
              <>
              <Grid container spacing={2} >
                <Grid item xs={12} md={4} >
                  <Typography variant="subtitle1" className="text-center" ><b>Sender Details</b></Typography>
                  <br/>
                  <Typography variant="body1">
                  <b>From:</b> {selectedNotification.senderId?.firstname}
                </Typography>
                <Typography variant="body1" >
                  <b>Work:</b> {selectedNotification.proposalId?.profileWork}
                </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem></Divider>
                <Grid item xs={12} md={3} >
                  <Typography variant="subtitle1" className="text-center" ><b>Job Details</b></Typography>
                  <br/>
                  <Typography variant="body1">
                  <b>Job:</b> {selectedNotification.jobId?.job}
                </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem></Divider>
                <Grid item xs={12} md={4} >
                <Typography variant="subtitle1" className="text-center" ><b>Proposal Details</b></Typography>
                <br/>
                <Typography variant="body1">
                  <b>Cover Letter:</b> {selectedNotification.proposalId?.coverLetter}
                </Typography>
                </Grid>
              </Grid>
                {/* <Typography variant="body1">
                  <b>From:</b> {selectedNotification.senderId?.firstname}
                </Typography>
                <Typography variant="body1">
                  <b>Job:</b> {selectedNotification.jobId?.job}
                </Typography>
                <Typography variant="body1">
                  <b>Cover Letter:</b> {selectedNotification.proposalId?.coverLetter}
                </Typography>
                <Typography variant="body1">
                  <b>Sent At:</b> {formatCreatedAt(selectedNotification.createdAt)}
                </Typography> */}
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="" onClick={handleClose}><b> X </b></Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NotificationComponent;
