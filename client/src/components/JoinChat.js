import React, { useContext, useState, useEffect, useRef } from 'react';
import { Typography, Box, FormHelperText, FormLabel, Input, Button, TableHead, TableRow, Paper, Table, TableBody, TableContainer, TableCell } from "@mui/material";
import FormControlUnstyled from '@mui/base/FormControlUnstyled';
import { SocketContext } from '../context/socket';
import { useNavigate } from 'react-router-dom';
import JoinChatPost from './JoinChatPost';

const JoinChat = () => {
  const socket = useContext( SocketContext );
  const [ chatList, setChatList ] = useState('');
  const [ allChatRooms, setAllChatRooms ] = useState([]);
  const [ chatListKeys, setChatListKeys ] = useState([]);
  const [ chatName, setChatName ] = useState('');
  const [ password, setPassword ] = useState('');
  const ref = useRef( null );
  const joiningChat = ( name ) => {
    setChatName( name );
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }
  // retrieves info of all the created chatrooms
  useEffect(() => {
    socket.emit('retrieve chatrooms', { chatName, password });
    socket.on('chat list', ( data ) => {
      const getkeys = Object.keys( data );
      setChatListKeys( getkeys );
      setChatList( data );
    });
  }, []);
  // makes an array of each chat room in a tag
  useEffect(() => {
    if( chatList ) {
      const chats = chatListKeys.map( currentKey => {
        return (
          < JoinChatPost key={ chatList[ currentKey ].id } chatName={ chatList[ currentKey ].chatName } joiningChat={ joiningChat } />
        );
      });
      setAllChatRooms( chats );
      console.log(chats);
    }
  }, [chatList])
  const navigate = useNavigate();
  const validate = (e) => {
    e.preventDefault();
    socket.emit( 'join-room', { chatName, password } );
    navigate( '/chatroom' );
  }
  return (
    < div className='joinChat' >
      < div ref={ ref } />
      < form onSubmit={ validate } autoComplete="off" >
        < FormControlUnstyled defaultValue="" required >
          < FormLabel style={{ color: '#FFFFFF' }} >Chat Name:</ FormLabel >
          < Input sx={{ width: 215 }} value={ chatName } onChange={ event => setChatName( event.target.value ) } />
          < FormHelperText />
        </ FormControlUnstyled >
        < br />
        < FormControlUnstyled defaultValue="" required >
          < FormLabel style={{ color: '#FFFFFF' }} >Password:</ FormLabel >
          < Input sx={{ width: 225 }} type='password' onChange={ event => setPassword( event.target.value ) } />
          < FormHelperText />
        </ FormControlUnstyled >
        < br />
        < Button 
          type="submit"
          sx={{ backgroundColor: '#FFFFFF', color: '#1a75d2', boxShadow: '2px 2px 4px #000000;' }}
          >Join
        </ Button >
      </ form >     
      < br />
      < TableContainer component={ Paper } >
        < Table sx={{ minWidth: 375 }} aria-label="simple table" >
          < TableHead >
            < TableRow >
              < TableCell >< b >Chat Name</ b ></ TableCell >
              < TableCell align="right" ></ TableCell >
            </ TableRow >
          </ TableHead >
          < TableBody style={{ color: '#1a75d2' }} >
            { allChatRooms }
          </ TableBody >
        </ Table >
      </ TableContainer >        
    </ div >
  );
};

export default JoinChat;