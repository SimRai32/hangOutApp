import React, { useContext, useState } from 'react';
import { Alert, Collapse, FormHelperText, FormLabel, Input, Button } from "@mui/material";
import FormControlUnstyled from '@mui/base/FormControlUnstyled';
import { SocketContext } from '../context/socket';
import { useNavigate } from 'react-router-dom';

const CreateChat = () => {

  const noError = 'no error';
  const roomNameError = 'error';
  const socket = useContext( SocketContext );
  const [ chatName, setChatName ] = useState('');
  const [ checkError, setCheckError ] = useState( noError );
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();
  const [ errorMessage, setErrorMessage ] = useState('');

  const validate = e => {

    e.preventDefault();
    
    if ( chatName && password ) {

      socket.emit( 'create-room', { chatName, password });

      socket.on('room-check', check => {
        
        if ( check === 'new' ) navigate( '/chatroom' );
  
      });

      setErrorMessage( 'Error: Room already exists. Please pick a different name' );

    }

    if( !password || !chatName ) {

      setErrorMessage( 'Error: Both chat name and password must be filled out' );

    }
    
  
    setCheckError( roomNameError );

  }

  return (

    < div className='createChat' >
        { checkError === 'error' && (
          < Collapse in={ checkError === 'error' } >
            < Alert severity='error' variant='outlined' >
              { errorMessage }
            </ Alert >
        </ Collapse >
        )}
        < form onSubmit={ validate } autoComplete='off' >
          < FormControlUnstyled defaultValue=''  >
            < FormLabel style={{ color: '#FFFFFF' }} >Chat Name:</ FormLabel >
            <Input sx={{ width: 215 }} error={ roomNameError === checkError } value={ chatName } onChange={ event => setChatName( event.target.value )} />
            < FormHelperText />
          </ FormControlUnstyled >
          < br />
          < FormControlUnstyled defaultValue='' >
            < FormLabel style={{ color: '#FFFFFF' }}>Password:</ FormLabel >
            < Input sx={{ width: 225 }} error={ roomNameError === checkError } type='password' value={ password } onChange={ event => setPassword( event.target.value ) } />
            < FormHelperText />
          </ FormControlUnstyled >
          < br />
          < Button 
          type='submit'
          sx={[
            { 
              backgroundColor: '#FFFFFF', 
              color: '#1a75d2', 
              boxShadow: '2px 2px 4px #000000;' 
            },
            { 
              '&:hover': {
              backgroundColor: '#1a75d2',
              color: '#FFFFFF'
            }}
          ]}
          >Create</ Button >
        </ form >
    </ div >

  );
};

export default CreateChat;