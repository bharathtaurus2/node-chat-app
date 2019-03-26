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
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
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

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        alert('Browser does not support geolocation');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Could not get location');
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});