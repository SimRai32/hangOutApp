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
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('send-username', userName);
    navigate('/options');
  }
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
        sx={{width: 215}} 
        data-testid="username" 
        value={userName} 
        onChange={event => setUserName(event.target.value)}
        label="Username"
      />
      <br />
      <br />
      <UserButton test = {testing} buttonName={"Submit"} onClick={handleSubmit}/>  
    </Box>
    
  );
};

export default Home;
