import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const Proposals = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  // Sample chat data (you can replace it with your own data)
  const chats = [
    { id: 1, name: 'Chat 1', messages: [] },
    { id: 2, name: 'Chat 2', messages: [] },
    { id: 3, name: 'Chat 3', messages: [] },
  ];

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <Grid container spacing={2}>
      {/* Sidebar with Chat List */}
      <Grid item xs={3}>
        <Paper elevation={3}>
          <List>
            {chats.map((chat) => (
              <ListItem
                key={chat.id}
                button
                onClick={() => handleChatClick(chat)}
                selected={selectedChat && selectedChat.id === chat.id}
              >
                <ListItemText primary={chat.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Selected Chat */}
      <Grid item xs={9}>
        {selectedChat ? (
          <Paper elevation={3}>
            <Typography variant="h6" sx={{ padding: 2 }}>
              {selectedChat.name}
            </Typography>
            {/* You can add a chat message component here */}
            {/* Example: <ChatMessages messages={selectedChat.messages} /> */}
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body1">Select a chat to start a conversation.</Typography>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default Proposals;
