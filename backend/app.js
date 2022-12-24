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
socketIO.on( 'connection', ( socket ) => {

  console.log( `⚡: ${socket.id} user just connected!` );

  socket.on('send-username', ( arg ) => {
    
    users[ arg ] = arg; 
    socket.username = arg;

  });


  socket.on( 'create-room', ( arg ) => {

    let check = 'new';
    const { chatName, password } = arg;

    if ( rooms[ chatName ] ) {

      check = 'exists';

    } else {

      rooms[ chatName ] = { chatName: chatName, password: password, id: roomID };
      roomID++;
      socket.join( chatName );

    }

    socketIO.emit( 'room-check', check );

  });


  socket.on( 'retrieve chatrooms', () => {

    socketIO.emit( 'chat list', rooms );
  
  });


  socket.on( 'join-room', ( arg ) => {

    let check = 'passed'
    const { chatName, password } = arg;

    if ( rooms[ chatName ] && rooms[ chatName ].password === password ) {

      socket.join( chatName );
      console.log( 'joined room!' );

    } else {

      check = 'failed';

    }

    socketIO.emit( 'room-credentials-check', check );

  });


  socket.on( 'send-message', ( arg ) => {

    socketIO.emit( 'messageResponse', arg );

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
