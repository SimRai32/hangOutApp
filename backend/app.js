const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const PORT = 4000;
app.use(cors());
const users = {};
const rooms = {};

const socketIO = require('socket.io')(http, {
  // CORS needed to make a web socket connection 
  cors: {

      origin: "http://localhost:3002",
      credentials: true,
      methods: ["GET", "POST"]

  }

});

// connect to client side
socketIO.on('connection', (socket) => {

  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("send-username", (arg) => {
    users[ arg ] = arg; 
    socket.username = arg;
  });

  socket.on("create-room", (arg)=> {
    rooms[ arg.chatName ] = { chatName: arg.chatName, password:arg.password };
    socket.join(arg.chatName);
  });
  socket.on("send-message", (arg)=> {
    console.log(arg.text);
    socketIO.emit('messageResponse', arg);
  });
  socket.on('disconnect', () => {

    console.log('🔥: A user disconnected');

  });

});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api/users', usersRouter(dbHelpers));

http.listen(PORT, () => {

  console.log(`Server listening on ${PORT}`);

});
module.exports = app;
