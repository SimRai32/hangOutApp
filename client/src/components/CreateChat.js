import React, { useContext, useState } from 'react';
import { Alert, Collapse, FormLabel, Input, Button } from "@mui/material";
import FormControlUnstyled from '@mui/base/FormControlUnstyled';
import { SocketContext } from '../context/socket';
import { useNavigate } from 'react-router-dom';

const CreateChat = props => {

  const noError = 'no error';
  const roomNameError = 'error';
  const success = 'success';
  const roomExistsError = 'Error: Room already exists. Please pick a different name';
  const emptyError = 'Error: Both chat name and password must be filled out';
  const testSuccess = 'Chat Creation Successful!';
  const socket = useContext( SocketContext );
  const [ chatName, setChatName ] = useState('');
  const [ check, setCheck ] = useState( noError );
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();
  const [ message, setMessage ] = useState('');
  const { test, roomTest } = props;

  // function that confirms an error
  const foundError = () => {

    setCheck( roomNameError );

  };


  // validates the chatroom that is trying to be created
  const validate = e => {

    e.preventDefault();
    let testCheck = false;

    // checks if both chatname and password are filled in
    if ( !chatName || !password ) {

      setMessage( emptyError );

      // checks if this is a functional test
    } else if ( test ) {

      // checks if test chatroom exists
      if ( !roomTest[chatName] ) {

        testCheck = true;
        setCheck( success );
        setMessage( testSuccess );

      } else {

        setCheck( roomNameError );
        setMessage( roomExistsError );

      }


    } else if ( chatName && password ) {

      // sends chatName and password to server to check if it already exists and if not creates it
      socket.emit( 'create-room', { chatName, password });

      // the result of checking chatroom names
      socket.on('room-check', check => {
        
        // if the chatroom did not exist it sends the user into that chatroom
        if ( check === 'new' ) navigate( '/chatroom' );
  
      });

      setMessage( roomExistsError );

    } 
    

    // prevents error message from popping up mid navigation
    if ( !testCheck ) setTimeout( foundError, 50 );

  }

  return (

    < div className='createChat' >
        { check !== 'no error' && (
          < Collapse in={ check !== 'no error' } >
            < Alert severity={ check } variant='outlined' >
              { message }
            </ Alert >
        </ Collapse >
        )}
        < form onSubmit={ validate } autoComplete='off' >
          < FormControlUnstyled defaultValue='chaaat'  >
            < FormLabel style={{ color: '#FFFFFF' }} >Chat Name:</ FormLabel >
            <Input sx={{ width: 215 }} data-testid={ 'Chat Name' } error={ roomNameError === check } value={ chatName } onChange={ event => setChatName( event.target.value )} />
          </ FormControlUnstyled >
          < br />
          < FormControlUnstyled defaultValue='paaaaaaaa' >
            < FormLabel style={{ color: '#FFFFFF' }}>Password:</ FormLabel >
            < Input sx={{ width: 225 }} data-testid={ 'Password' } error={ roomNameError === check } type='password' value={ password } onChange={ event => setPassword( event.target.value ) } />
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