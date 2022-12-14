import React, { useContext, useState } from 'react';
import { Box } from "@mui/material";
import UserButton from './UserButton';
import { SocketContext } from '../context/socket';
import CreateChat from './CreateChat';

const ChatOptions = () => {
  const socket = useContext(SocketContext);
  const chatSelect = 'chat select';
  const chatForm = 'chat form';
  const [currentPage, setCurrentPage] = useState(chatSelect);
  // switches from the two chat options to creating a chat room
  const createChatForm = () => {
    setCurrentPage(chatForm);
  }
  return (
    <div className='chatOptions'>
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
        {currentPage === chatSelect && (
          <>
            <UserButton 
              test={false}
              buttonName={"Create Chat"}
              onClick={createChatForm}
            />
            <UserButton
              test={false}
              buttonName={"Join Chat"} 
            />
          </>
        )}

        {currentPage === chatForm && (
          <CreateChat />
        )}
          
      </Box>
    </div>
  );
};

export default ChatOptions;