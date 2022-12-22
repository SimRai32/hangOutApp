import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../context/socket';
import { Box } from '@mui/system';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const Chat = () => {

  const socket = useContext( SocketContext );
  const [ messages, setMessages ] = useState([]);


  socket.on( 'messageResponse', data => setMessages([ ...messages, data ]) );


  return (

    < div className='chat' >
      < Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        sx={{
          color: 'white',
          background: 'linear-gradient(to right bottom, #274B74, #E963FD)'
        }}
      >
        < div className='chat__main' >
          < ChatBody messages={ messages } />
          < ChatFooter  />
        </ div >
      </ Box >
    </ div >

  );
};

export default Chat;