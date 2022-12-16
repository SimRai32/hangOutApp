import React, { useContext, useState } from 'react';
import { Box, FormHelperText, FormLabel, Input, Button } from "@mui/material";
import FormControlUnstyled from '@mui/base/FormControlUnstyled';
import { SocketContext } from '../context/socket';
import { useNavigate } from 'react-router-dom';
const CreateChat = () => {
  const socket = useContext(SocketContext);
  const [chatName, setChatName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const validate = (e) => {
    e.preventDefault();
    socket.emit('create-room', { chatName, password });
    navigate('/chatroom');
  }
  return (
    <div className='createChat'>
        <form onSubmit={validate} autoComplete="off">
          <FormControlUnstyled defaultValue="" required>
            <FormLabel style={{color: '#FFFFFF'}}>Chat Name:</FormLabel>
            <Input sx={{width: 215}} value={chatName} onChange={event => setChatName(event.target.value)}/>
            <FormHelperText />
          </FormControlUnstyled>
          <br />
          <FormControlUnstyled defaultValue="" required>
            <FormLabel style={{color: '#FFFFFF'}}>Password:</FormLabel>
            <Input sx={{width: 225}} type='password' value={password} onChange={event => setPassword(event.target.value)}/>
            <FormHelperText />
          </FormControlUnstyled>
          <br />
          <Button 
          type="submit"
          sx={{backgroundColor: '#FFFFFF', color: '#1a75d2', boxShadow: '2px 2px 4px #000000;'}}
          >Create</Button>
        </form>
    </div>
  );
};

export default CreateChat;