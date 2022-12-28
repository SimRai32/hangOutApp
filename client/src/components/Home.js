import React, { useState, useContext } from 'react';
import { Box, TextField } from "@mui/material";
import { SocketContext } from '../context/socket';
import { useNavigate } from 'react-router-dom';
import UserButton from './UserButton';

const Home = props => {

  const [ userName, setUserName ] = useState('');
  const [ nameError, setNameError ] = useState( false );
  const isError = 'error';
  const { test } = props;
  let testing = false;
  const socket = useContext( SocketContext );
  const navigate = useNavigate();
  const [ errorMessage, setErrorMessage ] = useState('');

  // this function executes when the Confirm button is clicked
  const handleConfirmation = e => {

    // prevents page from refreshing
    e.preventDefault();

    // sends username to the server
    if ( userName ) {

    socket.emit( 'send-username', userName );
    window.localStorage.setItem( 'userName', userName );
    window.localStorage.setItem( 'id', 0 );
    navigate( '/options' );

    }

    setNameError( isError );
    setErrorMessage( 'You must enter a username' );

  }


  // checking if this is a test run
  if ( test ) {

    testing = true;

  }


  return (
    
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
      < TextField 
        sx={{ width: 215 , paddingRight: 2 }}  
        value={userName} 
        onChange={ event => setUserName( event.target.value ) }
        label='Username'
        error={ nameError }
        helperText={ errorMessage }
      />
      < br />
      < br />
      < UserButton test = { testing } buttonName={ 'Confirm' } onClick={ handleConfirmation } />  
    </ Box >
    
  );
};

export default Home;
