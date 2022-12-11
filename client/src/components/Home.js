import React, { useState } from 'react';
import FormControlUnstyled from '@mui/base/FormControlUnstyled';
import { Button, FormLabel, FormHelperText, Box, Input } from "@mui/material";


const Home = (props) => {
  const [userName, setUserName] = useState('');

  const handleSubmit = () => {
    console.log("here");
    props.socket.emit('send-username', userName);
  };
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
        <form onSubmit={handleSubmit} autoComplete="off">
          <FormControlUnstyled defaultValue="" required>
              <FormLabel style={{color: '#FFFFFF'}}>Username:</FormLabel>
              <Input sx={{width: 215}} value={userName} onChange={event => setUserName(event.target.value)}/>
              <FormHelperText />
          </FormControlUnstyled>
          <Button 
            type="submit"
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
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Home;
