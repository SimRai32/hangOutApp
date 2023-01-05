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
  const socket = useContext( SocketContext );
  const navigate = useNavigate();
  const [ message, setMessage ] = useState('');

  // this function executes when the Confirm button is clicked
  const handleConfirmation = e => {

    // prevents page from refreshing
    e.preventDefault();

    
    // sends username to the server
    if ( !userName ) {

      setNameError( isError );
      setMessage( 'You must enter a username' );

    } else if ( test ) {

      setMessage( 'Successfully entered Username!' );

    } else {

      socket.emit( 'send-username', userName );
      window.localStorage.setItem( 'userName', userName );
      window.localStorage.setItem( 'id', 0 );
      navigate( '/options' );

    }
   

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
        helperText={ message }
      />
      < br />
      < br />
      < UserButton buttonName={ 'Confirm' } onClick={ handleConfirmation } />  
    </ Box >
    
  );
};

export default Home;
