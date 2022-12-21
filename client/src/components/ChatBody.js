import React, {useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import UserButton from './UserButton';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const ChatBody = ({ messages }) => {

  const navigate = useNavigate();
  const messagesEndRef = useRef( null );


  // get the reference for the end of the messages and scrolls to it smoothly
  const scrollToBottom = () => {

    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });

  };


  // every time a message is added the chatbox scrolls to the bottom
  useEffect( scrollToBottom, [ messages ] );


  const handleLeaveChat = () => {

    navigate( '/' );

  };


  // style settings for the message box
  const boxSettings = ( color, marginLength ) => {

    return {
      width: 'auto',
       maxWidth: '50%', 
       overflowX: 'auto', 
       backgroundColor: color, 
       opacity: [ 1 ], 
       borderRadius: '8px', 
       wordBreak: 'break-word',
       alignSelf: 'right',
       ml: `${ marginLength }px`
    }

  }

  
  return (

    <>
      < header className='chat__mainHeader' >
        <UserButton test={ false } onClick={ handleLeaveChat } buttonName={ 'LEAVE CHAT' } />
      </header>

      < div className='message__container' >
        < Box
        sx={{
          width: 300,
          height: 300, 
          backgroundColor: 'black',
          opacity: [ 0.4 ],
          overflow:'auto',
          display:'flex',
          flexDirection:'column',
        }}
        >
          { messages.map( message  =>
            message.user === localStorage.getItem( 'userName' ) ? (
              < div className='message__chats' key={ message.id } >
                < br />
                < Box sx={boxSettings( 'blue', 150 )} >
                  < Typography align='right' variant='h6' paddingRight={ 1 } > { message.text } </ Typography >
                </ Box >
              </ div >
            ) : (
              < div className='message__chats' key={ message.id } >
                <br />
                < Typography align='left' fontSize={ 15 } >{ message.user }</ Typography >
                <Box sx={ boxSettings( 'green', 0 ) }>
                  < Typography align='left' variant='h6' paddingLeft={ 1 } > { message.text } </ Typography >
                </ Box >
              </ div >
            )
          )}
          < div ref={ messagesEndRef } />
        </ Box > 
      </ div >
    </>

  );
};

export default ChatBody;