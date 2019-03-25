var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
    socket.emit('createChatMessage', {
        from: 'mike@gmail.com',
        to: 'suri@poori.com',
        text: 'Hi there!' 
    }, function(data) {
        console.log(data);
    });
});

socket.on('newMessage', function(message) {
    console.log(message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createChatMessage', {
        from: 'User1',
        text: jQuery('[name=message]').val()
    }, function(data) {

    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});