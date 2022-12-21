import React, { useState } from 'react';
import { Box } from "@mui/material";
import UserButton from './UserButton';
import CreateChat from './CreateChat';
import JoinChat from './JoinChat';

const ChatOptions = () => {

  const chatSelect = 'chat select';
  const chatForm = 'chat form';
  const chatList = 'chat list';
  const [ currentPage, setCurrentPage ] = useState( chatSelect );


  // switches from the two chat options to creating a chat room
  const createChatForm = () => {

    setCurrentPage( chatForm );

  }


  // switches from the two chat options to showing the list of joinable chat rooms
  const getChatList = () => {

    setCurrentPage( chatList );

  }


  return (

    < div className='chatOptions' >
      < Box
      display='flex'
      justifyContent='space-evenly'
      alignItems='center'
      minHeight='100vh'
      sx={{
        color: 'white',
        background: 'linear-gradient( to right bottom, #274B74, #E963FD )'
      }}
      >
        { currentPage === chatSelect && (
          <>
            < UserButton 
              test={ false }
              buttonName={ 'Create Chat' }
              onClick={ createChatForm }
            />
            < UserButton
              test={ false }
              buttonName={ 'Join Chat' }
              onClick={ getChatList } 
            />
          </>
        )}

        { currentPage === chatForm && (
          < CreateChat />
        )}

        { currentPage === chatList && (
          < JoinChat />
        )}
      </ Box >
    </ div >

  );
};

export default ChatOptions;