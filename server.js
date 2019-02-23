const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = 4001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

var numUsers = 0;

io.on("connection", socket => {
  numUsers++;
  console.log("user connected");
  console.log(`num of users: ${numUsers}`);
  var message;
  if (numUsers > 1) {
    message = "Ready to play!";
    io.sockets.emit("user ready", {
      message: message,
      numUsers: numUsers
    });
  }

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    --numUsers;
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
