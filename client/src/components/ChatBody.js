import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserButton from './UserButton';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
const ChatBody = ({ messages }) => {
  const navigate = useNavigate();
  const handleLeaveChat = () => {
    navigate('/');
  };
  const boxSettings = (color) => {
    return {
      width: 'auto',
       maxWidth: '50%', 
       overflowX: 'auto', 
       backgroundColor: color, 
       opacity: [ 1 ], 
       borderRadius: '8px', 
       wordBreak: "break-word"
    }
  }
  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <UserButton test={false} onClick={handleLeaveChat} buttonName={"LEAVE CHAT"} />
      </header>

      <div className="message__container">
        <Box
        sx={{
          width: 300,
          height: 300, 
          backgroundColor: 'black',
          opacity: [ 0.4 ],
          overflow:'auto',
          display:'flex',
          flexDirection:'column'
        }}
        >
          {messages.map((message) =>
            message.user === localStorage.getItem('userName') ? (
              <div className="message__chats" key={message.id}>
                <br />
                <Box align='right' sx={boxSettings('blue')}>
                  < Typography align='right' variant='h6' paddingRight={1}> {message.text} </ Typography >
                </Box>
              </div>
            ) : (
              <div className="message__chats" key={message.id}>
                <br />
                < Typography align='left' fontSize={15} >{message.user}</ Typography >
                <Box sx={boxSettings('green')}>
                  < Typography align='left' variant='h6' paddingLeft={1}> {message.text} </ Typography >
                </Box>
              </div>
            )
          )}

          <div className="message__status">
            <p>Someone is typing...</p>
          </div>
        </ Box> 
      </div>
    </>
  );
};

export default ChatBody;