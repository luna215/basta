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
  console.log('user connected');
  console.log(`num of users: ${numUsers}`);
  let message;
  if (numUsers < 2) {
    message = "Waiting for more players...";
  } else {
    message = "Ready to play!";
    io.sockets.emit("user ready", message);
  }

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
    --numUsers;
    console.log(`num of user: ${numUsers}`);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
