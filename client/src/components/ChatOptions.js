import React, { useState } from 'react';
import { Box, Container } from "@mui/material";
import UserButton from './UserButton';
import CreateChat from './CreateChat';
import JoinChat from './JoinChat';
import { useNavigate } from 'react-router-dom';


const ChatOptions = () => {

  const chatSelect = 'chat select';
  const chatForm = 'chat form';
  const chatList = 'chat list';
  const rightSide = 'flex-end';
  const middle = 'center';
  const navigate = useNavigate();
  const [ currentPage, setCurrentPage ] = useState( chatSelect );


  // function that stylizes each container
  const containerStyling = ( horizontal ) => {

    return {

      display: 'flex',
      justifyContent: horizontal,
      alignContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '10px',
      height: 'calc(100vh - 100px)',

    };

  };


  // sends user back to username creation page
  const backToUsername = () => {

    navigate( '/' );

  }


  // switches from the two chat options to creating a chat room
  const createChatForm = () => {

    setCurrentPage( chatForm );

  }


  // switches from the two chat options to showing the list of joinable chat rooms
  const getChatList = () => {

    setCurrentPage( chatList );

  }

  // sends user back to chat options
  const goBack = () => {

    setCurrentPage( chatSelect );

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
          < Container sx={ containerStyling( rightSide ) } >
            < UserButton 
              test={ false }
              buttonName={ 'Back' }
              onClick={ backToUsername }
            />
            < Container sx={ containerStyling( middle ) } >
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
            </ Container >
          </ Container >
        )}

        { currentPage === chatForm && (
          < Container sx={ containerStyling( rightSide ) } >
            < UserButton 
              test={ false }
              buttonName={ 'Back' }
              onClick={ goBack }
            />
            < Container sx={ containerStyling( middle ) } >
              < CreateChat />
            </ Container >
          </ Container >
        )}

        { currentPage === chatList && (
          < Container sx={ containerStyling( rightSide ) } >
            < UserButton 
              test={ false }
              buttonName={ 'Back' }
              onClick={ goBack }
            />
            < Container sx={ containerStyling( middle ) } >
              < JoinChat />
            </ Container >
          </ Container >
        )}
      </ Box >
    </ div >

  );
};

export default ChatOptions;