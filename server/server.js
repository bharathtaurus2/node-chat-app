const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, "../public");

const port = process.env.port||3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('disconnect', () => {
    console.log('User was disconnected')
  });

  socket.emit('newMessage',
    generateMessage('Admin','Welcome to the chat app!'));
  socket.broadcast.emit('newMessage',
    generateMessage('Admin', 'A new user has joined'));

  socket.on('createChatMessage', (message) => {
    console.log(message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    // io.emit('newMessage', {
    //   from: message.from,
    //   to: message.to,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  // socket.emit('newMessage', {
  //   from: 'gb@coolstar.net',
  //   to: 'kai@caliper.com',
  //   text: 'I hear you!',
  //   createdAt: new Date()
  // });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
