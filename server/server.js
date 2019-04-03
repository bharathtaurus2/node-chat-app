const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {isRealString} = require('./utils/validation');
const {Users, Rooms} = require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, "../public");

const port = process.env.PORT||3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var rooms = new Rooms();


function notifyRoomListUpdate(socket) {
  console.log('updating room  list');
  io.emit('roomListUpdate', Array.from(rooms.getRoomList()));
}

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user) {
      if(users.getUserList(user.room).length == 0) {
        rooms.remove(user.room);
        notifyRoomListUpdate(socket);
      }
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    }
  });

  socket.on('createChatMessage', (message, callback) => {
    callback('Message broadcasted!');
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
  });

  socket.on('createLocationMessage', (message) => {
    var user = users.getUser(socket.id);
    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, message.latitude, message.longitude));
    }
  });

  socket.on('load', (params, callback) => {
    callback(null, Array.from(rooms.getRoomList()));
  });

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required!');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    var newRoom = null;
    users.addUser(socket.id, params.name, params.room);
    rooms.add(params.room);
    notifyRoomListUpdate(socket);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage',
    generateMessage('Admin','Welcome to the chat app!'));
    socket.broadcast.to(params.room).emit('newMessage',
    generateMessage('Admin', `${params.name} has joined`));

    callback('');
  });

});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
