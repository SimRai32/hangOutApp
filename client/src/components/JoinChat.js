import React, { useContext, useState, useEffect } from 'react';
import { Typography, Box, FormHelperText, FormLabel, Input, Button } from "@mui/material";
import FormControlUnstyled from '@mui/base/FormControlUnstyled';
import { SocketContext } from '../context/socket';
import { useNavigate } from 'react-router-dom';
const JoinChat = () => {
  const socket = useContext(SocketContext);
  const [chatList, setChatList] = useState('');
  const [chatListKeys, setChatListKeys] = useState([]);
  const [chatName, setChatName] = useState('');
  const [password, setPassword] = useState('');
  // retrieves info of all the created chatrooms
  useEffect(() => {
    socket.emit('retrieve chatrooms', {chatName, password});
    socket.on('chat list', (data) => {
      const getkeys = Object.keys(data);
      setChatListKeys(getkeys);
      setChatList(data);
    });
  }, []);
  const navigate = useNavigate();
  const validate = (e) => {
    e.preventDefault();
    socket.emit('join-room', { chatName, password });
    navigate('/chatroom');
  }
  return (
    <div className='joinChat'>
        <form onSubmit={validate} autoComplete="off">
          <FormControlUnstyled defaultValue="" required>
            <FormLabel style={{color: '#FFFFFF'}}>Chat Name:</FormLabel>
            <Input sx={{width: 215}} value={chatName} onChange={event => setChatName(event.target.value)}/>
            <FormHelperText />
          </FormControlUnstyled>
          <br />
          <FormControlUnstyled defaultValue="" required>
            <FormLabel style={{color: '#FFFFFF'}}>Password:</FormLabel>
            <Input sx={{width: 225}} type='password' onChange={event => setPassword(event.target.value)}/>
            <FormHelperText />
          </FormControlUnstyled>
          <br />
          <Button 
          type="submit"
          sx={{backgroundColor: '#FFFFFF', color: '#1a75d2', boxShadow: '2px 2px 4px #000000;'}}
          >Join</Button>
        </form>

        {chatListKeys.map((currentKey) =>
              <div className="chat list" key={chatList[currentKey].id}>
                <br />
                <Box>
                <form onSubmit={validate} autoComplete="off">
                  < Typography variant='h6' paddingRight={1}> {chatList[currentKey].chatName} </ Typography >
                  <FormControlUnstyled defaultValue="" required>
                    <FormLabel style={{color: '#FFFFFF'}}>Password:</FormLabel>
                    <Input sx={{width: 215}} type='password' onChange={event => setPassword(event.target.value)}/>
                    <FormHelperText />
                  </FormControlUnstyled>
                </form >
                  
                </Box>
              </div>
            
          )}
    </div>
  );
};

export default JoinChat;