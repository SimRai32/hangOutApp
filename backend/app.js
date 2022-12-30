const express = require( 'express' );
const path = require( 'path' );
const cookieParser = require( 'cookie-parser' );
const logger = require( 'morgan' );
const db = require( './db' );
const dbHelpers = require( './helpers/dbHelpers' )( db );
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();
const cors = require( 'cors' );
const http = require( 'http' ).Server( app );
const PORT = 4000;
app.use( cors() );
const users = {};
const rooms = {};
const ids = {}; 
let roomID = 0;


const socketIO = require( 'socket.io' )( http, {
  // CORS needed to make a web socket connection 
  cors: {

      origin: 'http://localhost:3002',
      credentials: true,
      methods: [ 'GET', 'POST' ]

  }

});


// connect to client side
socketIO.on( 'connection', async ( socket ) => {

  const id = socket.id;
  ids[ id ]= {};
  console.log( `⚡: ${ id } user just connected!` );
  

  socket.on('send-username', ( arg ) => {
    
    
    users[ arg ] = arg; 
    socket.username = arg;

  });


  // creates new room
  socket.on( 'create-room', ( arg ) => {

    let check = 'new';
    
    const { chatName, password } = arg;
    // checks if room already exists
    if ( rooms[ chatName ] ) {

      check = 'exists';

    // creates room if it does not exist already
    } else {

      rooms[ chatName ] = { chatName: chatName, password: password, id: roomID };
      roomID++;
      socket.join( chatName );
      ids[ id ].room = chatName;

    }

    // client is informed whether the room was created
    socketIO.emit( 'room-check', check );

  });


  // used to retrieve all chatroom info
  socket.on( 'retrieve chatrooms', () => {

    // information about all rooms sent to client
    socketIO.emit( 'chat list', rooms );
  
  });


  // tries to connect user to a created room
  socket.on( 'join-room', ( arg ) => {

    let check = 'passed'
    const { chatName, password } = arg;

    console.log(chatName);
    // checks if user's chat name and password match any room
    if ( rooms[ chatName ] && rooms[ chatName ].password === password ) {

      
      // connects user to chatroom
      socket.join( chatName );
      ids[ id ].room = chatName;
      console.log( 'joined room!' );

    } else {

      check = 'failed';

    }

    // client is informed whether there was a match
    socketIO.emit( 'room-credentials-check', check );

  });


  socket.on( 'send-message', ( arg ) => {

     // sends message to users within a specific chatroom
     console.log("send message",ids[ id ].room );
    socketIO.to( ids[ id ].room ).emit( 'messageResponse', arg );

  });


  socket.on( 'disconnect', () => {

    console.log( '🔥: A user disconnected' );

  });

});

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.use( cookieParser() );
app.use( express.static( path.join(__dirname, 'public' )) );
app.use( '/', indexRouter );
app.use( '/api/users', usersRouter( dbHelpers ) );

http.listen( PORT, () => {

  console.log( `Server listening on ${ PORT }` );

});
module.exports = app;
