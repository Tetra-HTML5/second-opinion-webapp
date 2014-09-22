var express = require('express');
var socket = require('socket.io');
var app = express();
app.configure(function () {
    app.use(
        "/", //the URL throught which you want to access to you static content
        express.static(__dirname+ '/public') //where your static content is located in your filesystem
    );
});



// LISTEN FOR REQUESTS
var server = app.listen(3000);
var io = socket.listen(server);

// SOCKET IO
io.sockets.on('connection', function (socket) {

  socket.on('changeurl', function(url) {
  	io.sockets.emit('changeurl', url);
  });

  socket.on('changetool', function(tool) {
  	io.sockets.emit('changetool', tool);
  });

  socket.on('incermentslice', function() {
  	io.sockets.emit('incermentslice', 'incerment');
  });

  socket.on('decrementslice', function() {
  	io.sockets.emit('decrementslice', 'decrement');
  });

  socket.on('zoom', function(data) {
    io.sockets.emit('zoom', data);
  });

  socket.on('zoom2', function(data) {
    io.sockets.emit('zoom2', data);
  });

  socket.on('translate', function(data) {
    io.sockets.emit('translate', data);
  });

  socket.on('translate2', function(data) {
    io.sockets.emit('translate2', data);
  });

  socket.on('windowlevel', function(data) {
    io.sockets.emit('windowlevel', data);
  });

});