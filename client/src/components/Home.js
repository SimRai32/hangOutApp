import React, { useState, useContext } from 'react';
import { Box, TextField } from "@mui/material";
import { SocketContext } from '../context/socket';
import { useNavigate } from 'react-router-dom';
import UserButton from './UserButton';


const Home = (props) => {
  const [userName, setUserName] = useState('');
  let testing = false;
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  // this function executes when the Confirm button is clicked
  const handleConfirmation = (e) => {
    // prevents page from refreshing
    e.preventDefault();
    // sends username to the server
    socket.emit('send-username', userName);
    navigate('/options');
  }
  // checking if this is a test run
  if (props.test) {
    testing = true;
  }
  return (
    
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
      <TextField 
        sx={{width: 215 , paddingRight: 2}}  
        value={userName} 
        onChange={event => setUserName(event.target.value)}
        label="Username"
      />
      <br />
      <br />
      <UserButton test = {testing} buttonName={"Confirm"} onClick={handleConfirmation}/>  
    </Box>
    
  );
};

export default Home;
