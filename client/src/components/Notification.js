/* eslint-disable react-hooks/exhaustive-deps */
import { Container, List, ListItem, Typography, Button, Grid, Checkbox, IconButton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkAsReadIcon from "@mui/icons-material/MarkEmailRead";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const fetchNotifications = async () => {
    try {
      if (!userData._id) {
        return;
      }

      const res = await fetch(`/notifications/${userData._id}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch notifications. Status: ${res.status}`);
      }

      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
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
    fetchNotifications();
  }, [userData._id]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <Container maxWidth="xl" className="p-5">
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
        <h1>Notifications</h1>
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
          {notifications
            .slice(startIndex, endIndex)
            .map((notification) => (
              <Grid container spacing={1} key={notification._id}>
                <Grid item xs={12}>
                  <Button className="notification-button" fullWidth>
                    <ListItem>
                      <Checkbox
                        // checked={}
                        onChange={() =>
                          handleCheckboxChange(notification._id)
                        }
                        color="primary"
                      />
                      <div>{notification.message}</div>
                    </ListItem>
                  </Button>
                </Grid>
              </Grid>
            ))}
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
    </Container>
  );
};

export default NotificationComponent;
