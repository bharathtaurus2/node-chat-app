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
    var formattedTime = moment(message.createdAt).format('hh:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('hh:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    // li.text(`${message.from}: ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
    
});

var messageBox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createChatMessage', {
        from: 'User1',
        text: messageBox.val()
    }, function(data) {
        messageBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        alert('Browser does not support geolocation');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location');
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Could not get location');
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});