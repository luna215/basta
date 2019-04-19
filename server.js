const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = 4001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

var numUsers = 0;
var ready = false;

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

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    ready = false;
    --numUsers;
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
