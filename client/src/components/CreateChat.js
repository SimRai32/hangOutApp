import React, { useContext, useState } from 'react';
import { Alert, Collapse, FormHelperText, FormLabel, Input, Button } from "@mui/material";
import FormControlUnstyled from '@mui/base/FormControlUnstyled';
import { SocketContext } from '../context/socket';
import { useNavigate } from 'react-router-dom';

const CreateChat = props => {

  const noError = 'no error';
  const roomNameError = 'error';
  const success = 'success';
  const socket = useContext( SocketContext );
  const [ chatName, setChatName ] = useState('');
  const [ check, setCheck ] = useState( noError );
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();
  const [ message, setMessage ] = useState('');
  const [ alertType, setAlertType ] = useState('');
  const { test } = props;

  // function that confirms an error
  const foundError = () => {

    setCheck( roomNameError );
    setAlertType( roomNameError );

  };


  // validates the chatroom that is trying to be created
  const validate = e => {

    e.preventDefault();
    let testCheck = false;

    if ( !chatName || !password ) {

      setMessage( 'Error: Both chat name and password must be filled out' );

    } else if ( test ) {

      testCheck = true;
      setCheck( success );
      setAlertType( success );
      setMessage( 'Chat Creation Successful!' );

    } else if ( chatName && password ) {

      // sends chatName and password to server to check if it already exists and if not creates it
      socket.emit( 'create-room', { chatName, password });

      // the result of checking chatroom names
      socket.on('room-check', check => {
        
        // if the chatroom did not exist it sends the user into that chatroom
        if ( check === 'new' ) navigate( '/chatroom' );
  
      });

      setMessage( 'Error: Room already exists. Please pick a different name' );

    } 
    

    // prevents error message from popping up mid navigation
    console.log( message, check, testCheck  );
    if ( !testCheck ) setTimeout( foundError, 50 );

  }

  return (

    < div className='createChat' >
        { check !== 'no error' && (
          < Collapse in={ check !== 'no error' } >
            < Alert severity={ alertType } variant='outlined' >
              { message }
            </ Alert >
        </ Collapse >
        )}
        < form onSubmit={ validate } autoComplete='off' >
          < FormControlUnstyled defaultValue=''  >
            < FormLabel style={{ color: '#FFFFFF' }} >Chat Name:</ FormLabel >
            <Input sx={{ width: 215 }} error={ roomNameError === check } value={ chatName } onChange={ event => setChatName( event.target.value )} />
            < FormHelperText />
          </ FormControlUnstyled >
          < br />
          < FormControlUnstyled defaultValue='' >
            < FormLabel style={{ color: '#FFFFFF' }}>Password:</ FormLabel >
            < Input sx={{ width: 225 }} error={ roomNameError === check } type='password' value={ password } onChange={ event => setPassword( event.target.value ) } />
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