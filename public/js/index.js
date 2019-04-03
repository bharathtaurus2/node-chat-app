var socket = io();

function updateHtmlRoomList(rooms) {
  var list = jQuery('#rooms');
  list.empty();
  rooms.forEach((function(room) {
    var op = jQuery('<option></option>');
    op.attr('value',room);
    list.append(op);
  }));
  list.html();
}

socket.emit('load', null, function(err, rooms) {
  if(!err) {
    updateHtmlRoomList(rooms);
  }
});

socket.on('roomListUpdate', function(rooms) {
  console.log('Room List Updated');
  updateHtmlRoomList(rooms);
});
