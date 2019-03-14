var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
    socket.emit('createChatMessage', {
        from: 'mike@gmail.com',
        to: 'suri@poori.com',
        text: 'Hi there!' 
    });
});

socket.on('newMessage', function(message) {
    console.log(message);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});