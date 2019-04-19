const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = 4001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

var numUsers = 0;
var ready = false;
var results = [];

io.on("connection", socket => {
  numUsers++;
  console.log("user connected");
  console.log(`num of users: ${numUsers}`);
  var message;
  if (numUsers > 1 && !ready) {
    message = "Ready to play!";
    ready = true;
    io.sockets.emit("user ready", {
      message: message,
      numUsers: numUsers
    });
  }

  // If a user presses play
  socket.on('pressed play', () => {
    io.sockets.emit("user pressed play", {
      message: 'starting game...',
    });
  });

  // If a user presses basta
  socket.on('basta', (data) => {
    console.log('user pressed basta');
    io.sockets.emit('basta', {
      message: 'STOP'
    });
  });

  socket.on('add to results', (data) => {
    results.push(data);
    console.log(results);
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    ready = false;
    --numUsers;
    console.log('user left');
    console.log(`num of users: ${numUsers}`);
    if(numUsers < 2) {
      console.log('we need to wait for players');
      io.sockets.emit('wait for players', {
        message: 'Waiting for more players...',
        numUsers: numUsers,
      })
    }
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
