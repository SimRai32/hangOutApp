import React, { useState, useContext } from 'react';
import { Button, Box, Input } from "@mui/material";
// import { SocketContext } from '../context/socket';


const ChatOptions = () => {
  // const socket = useContext(SocketContext);
  return (
    <div className='registerUser'>
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        color: 'white',
        background: 'linear-gradient(to right bottom, #274B74, #E963FD)'
      }}
      >
        
          <Button 
            sx={[
              {
                backgroundColor: '#FFFFFF',
                color: '#1a75d2',
                boxShadow: '2px 2px 4px #000000;'
              },
              {
                '&:hover': {
                backgroundColor: '#1a75d2',
                color: '#FFFFFF'
              }}
            ]}
          >
            Join Chat
          </Button>
          <Button 
            sx={[
              {
                backgroundColor: '#FFFFFF',
                color: '#1a75d2',
                boxShadow: '2px 2px 4px #000000;'
              },
              {
                '&:hover': {
                backgroundColor: '#1a75d2',
                color: '#FFFFFF'
              }}
            ]}
          >
            Create Chat
          </Button>
      </Box>
    </div>
  );
};

export default ChatOptions;