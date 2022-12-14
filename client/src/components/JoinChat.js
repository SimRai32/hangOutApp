import React, { useContext, useState, useEffect, useRef } from 'react';
import { Alert, Collapse, FormLabel, Input, Button, TableHead, TableRow, Paper, Table, TableBody, TableContainer, TableCell } from "@mui/material";
import FormControlUnstyled from '@mui/base/FormControlUnstyled';
import { SocketContext } from '../context/socket';
import { useNavigate } from 'react-router-dom';
import JoinChatPost from './JoinChatPost';
import UserButton from './UserButton';

const JoinChat = props => {

  const socket = useContext( SocketContext );
  const show = true;
  const hide = false;
  const noError = 'no error';
  const success = 'success';
  const roomNameError = 'error';
  const mismatchError = 'Error: Chat name and password do not match up';
  const [ chatList, setChatList ] = useState('');
  const [ check, setCheck ] = useState( noError );
  const [ allChatRooms, setAllChatRooms ] = useState([]);
  const [ chatListKeys, setChatListKeys ] = useState([]);
  const [ chatName, setChatName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ showList, setShowList ] = useState( hide );
  const [ message, setMessage ] = useState('');
  const ref = useRef( null );
  const navigate = useNavigate();
  const { test, roomTest } = props;


  // scrolls to the top of the page when the join button is pressed
  const joiningChat = ( name ) => {

    setChatName( name );
    ref.current?.scrollIntoView({ behavior: 'smooth' });

  }


  // sets the showList variable to show
  const showingList = () => {

    setShowList( show );

  };


  // sets the showList variable to hide
  const hidingList = () => {

    setShowList( hide );

  };


  // retrieves info of all the created chatrooms
  useEffect(() => {
    
    // checks if this a functional test
    if ( !test ) {

      socket.emit('retrieve chatrooms', { chatName, password });

      socket.on( 'chat list', ( data ) => {

        const getkeys = Object.keys( data );
        setChatListKeys( getkeys );
        setChatList( data );

      })

    } else {

      const getkeys = Object.keys( roomTest );
      setChatListKeys( getkeys );
      setChatList( roomTest );

    }

  }, []);

  
  useEffect(() => {

    // checks if there is at least 1 available chatroom
    if ( chatList ) {

      // makes an array of each chat room in a tag
      const chats = chatListKeys.map( currentKey => {

        const key = chatList[ currentKey ].id;
        const chatName = chatList[ currentKey ].chatName;

        const foundChat = () => { 

          joiningChat( chatName );
          setShowList( hide ); 

        }

        return (
          < JoinChatPost key = { key } chatName={ chatName }  joiningChat={ foundChat } />
        );

      });

      // sets the chat room array to the variable allChatRooms
      setAllChatRooms( chats );

    }

  }, [ chatList ]);


  // checks if user has the correct password and if so puts them into the chatroom (in progress)
  const validate = e => {

    e.preventDefault();

    // checks if the page is being tested
    if ( test ) {

      // checks if any of the sample rooms matches the chat name
      if ( roomTest[ chatName ] ) {

        const actualPassword = roomTest[ chatName ].password;

        // checks if the password of the room matches
        if ( actualPassword === password ) {

          // success
          setCheck( success );
          setMessage( 'Joined Successfullly!' );

        } else {

          // failure
          setCheck( roomNameError );
          setMessage( mismatchError );

        }

      }

    } // checks if both password and chat name is filled out
      else if ( password && chatName ) {

      // sends password and chat name to the server to see if there is any matching pair
      socket.emit( 'join-room', { chatName, password } );
      
      socket.on('room-credentials-check', check => {

        // if there was a matching pair the user is sent into the chatroom
        if ( check === 'passed' ) navigate( '/chatroom' );

        // confirmed error
        setCheck( roomNameError );
        setMessage( mismatchError );
  
      });


    }

    if ( !password || !chatName ) {

      // confirmed error
      setCheck( roomNameError );
      setMessage( 'Error: Both chat name and password must be filled out' );

    }


  }


  return (

    < div className='joinChat' >
      { check !== 'no error' && (
          < Collapse in={ check !== 'no error' } >
            < Alert severity={ check } variant='outlined' >
              { message }
            </ Alert >
        </ Collapse >
        )}
      < div ref={ ref } />
      < form onSubmit={ validate } autoComplete='off' >
        < FormControlUnstyled defaultValue='' required >
          < FormLabel style={{ color: '#FFFFFF' }} >Chat Name:</ FormLabel >
          < Input sx={{ width: 215 }} data-testid={ 'Chat Name' }  value={ chatName } error={ roomNameError === check } onChange={ event => setChatName( event.target.value ) } />
        </ FormControlUnstyled >
        < br />
        < FormControlUnstyled defaultValue='' required >
          < FormLabel style={{ color: '#FFFFFF' }} >Password:</ FormLabel >
          < Input sx={{ width: 225 }} data-testid={ 'Password' }  type='password' value={ password } error={ roomNameError === check } onChange={ event => setPassword( event.target.value ) } />
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
          >Join
        </ Button >
      </ form >     
      < br />
      {( showList === hide ) && 
      < UserButton test={ false } data-testid={ 'Room List' } buttonName={ 'Chat List' }  onClick={  showingList  } />
      }
      {( showList === show ) && 
        <> 
          < TableContainer component={ Paper } >
            < Table sx={{ minWidth: 375 }} aria-label='simple table' >
              < TableHead >
                < TableRow >
                  < TableCell >< b >Chat Name</ b ></ TableCell >
                  < TableCell align='right' ></ TableCell >
                </ TableRow >
              </ TableHead >
              < TableBody style={{ color: '#1a75d2' }} >
                { allChatRooms }
              </ TableBody >
            </ Table >
          </ TableContainer >
          < br />
          < UserButton test={ false } buttonName={ 'Hide Chat List' }  onClick={ hidingList } />
        </>
      }        
    </ div >

  );
};

export default JoinChat;