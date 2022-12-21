import React, { useContext, useState, useEffect, useRef } from 'react';
import { FormHelperText, FormLabel, Input, Button, TableHead, TableRow, Paper, Table, TableBody, TableContainer, TableCell } from "@mui/material";
import FormControlUnstyled from '@mui/base/FormControlUnstyled';
import { SocketContext } from '../context/socket';
import { useNavigate } from 'react-router-dom';
import JoinChatPost from './JoinChatPost';
import UserButton from './UserButton';

const JoinChat = () => {

  const socket = useContext( SocketContext );
  const show = true;
  const hide = false;
  const [ chatList, setChatList ] = useState('');
  const [ allChatRooms, setAllChatRooms ] = useState([]);
  const [ chatListKeys, setChatListKeys ] = useState([]);
  const [ chatName, setChatName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ showList, setShowList ] = useState( hide );
  const ref = useRef( null );
  const navigate = useNavigate();


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

    socket.emit('retrieve chatrooms', { chatName, password });

    socket.on('chat list', ( data ) => {

      const getkeys = Object.keys( data );
      setChatListKeys( getkeys );
      setChatList( data );

    });

  }, []);

  
  useEffect(() => {

    // checks if there is at least 1 available chatroom
    if( chatList ) {

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
    socket.emit( 'join-room', { chatName, password } );
    navigate( '/chatroom' );

  }


  return (

    < div className='joinChat' >
      < div ref={ ref } />
      < form onSubmit={ validate } autoComplete='off' >
        < FormControlUnstyled defaultValue='' required >
          < FormLabel style={{ color: '#FFFFFF' }} >Chat Name:</ FormLabel >
          < Input sx={{ width: 215 }} value={ chatName } onChange={ event => setChatName( event.target.value ) } />
          < FormHelperText />
        </ FormControlUnstyled >
        < br />
        < FormControlUnstyled defaultValue='' required >
          < FormLabel style={{ color: '#FFFFFF' }} >Password:</ FormLabel >
          < Input sx={{ width: 225 }} type='password' onChange={ event => setPassword( event.target.value ) } />
          < FormHelperText />
        </ FormControlUnstyled >
        < br />
        < Button 
          type='submit'
          sx={{ backgroundColor: '#FFFFFF', color: '#1a75d2', boxShadow: '2px 2px 4px #000000;' }}
          >Join
        </ Button >
      </ form >     
      < br />
      {( showList === hide ) && 
      < UserButton test={ false } buttonName={ 'Chat List' }  onClick={  showingList  } />
      }
      {( showList === show ) && <> 
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