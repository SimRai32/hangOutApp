import React, { useState, useContext } from 'react';
import { Input, Button } from '@mui/material';
import { FormControlUnstyled } from '@mui/base';
import { SocketContext } from '../context/socket';
const ChatFooter = () => {
  const [message, setMessage] = useState('');
  const socket = useContext(SocketContext);
  // gets username from local storage
  const user = localStorage.getItem("userName");

  const handleSendMessage = (e) => {
    e.preventDefault();
    // checks if user has at least typed in 1 character before outputting message
    if (message) {
      let id = Number(localStorage.getItem("id")) + 1;
      localStorage.setItem("id", id);
      // sends message information to the server to store
      socket.emit('send-message', {
        text: message,
        user,
        id
      });
      setMessage('');
    }
  };

  return <div className="chat__footer">
    <form className="form" onSubmit={handleSendMessage}>
    <FormControlUnstyled defaultValue="" required>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        < Button 
        type='submit'
        sx={[
          {
            backgroundColor: '#FFFFFF', 
            color: '#1a75d2', 
            boxShadow: '1px 1px 2px #000000;', 
            fontSize:'10px'},
          {
            '&:hover': {
              backgroundColor: '#1a75d2',
              color: '#FFFFFF'
          }}
        ]}
        >
          SEND
        </ Button >
        </ FormControlUnstyled>
      </form>
  </div>;
};

export default ChatFooter;
