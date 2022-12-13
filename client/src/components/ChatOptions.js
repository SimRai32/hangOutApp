import React from 'react';
import { Button, Box} from "@mui/material";



const ChatOptions = () => {
  
  return (
    <div className='registerUser'>
      <Box
      display="flex"
      justifyContent="space-evenly"
      space
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