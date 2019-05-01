const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = 4001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

var results;
var numUsers = 0;
var users = [];
var ready = false;

io.on("connection", socket => {
  var message;
  var addedUser = false;

  socket.on('add user', (username) => {
    if(addedUser) { return; }

    if(users.includes(username)) {
      console.log('User already exist');
    } else {
      socket.username = username;
      results = [];
      numUsers++;
      console.log("user connected");
      console.log(`num of users: ${numUsers}`);
      users.push(username);
      addedUser = true;
      console.log(`results length: ${results.length}`);
      if (numUsers > 1 && !ready) {
        message = "Ready to play!";
        ready = true;
        io.sockets.emit("user ready", {
          message: message,
          numUsers: numUsers
        });
      }
    }
  });
  
  // If a user presses play
  socket.on('pressed play', () => {
    io.sockets.emit("user pressed play", {
      message: 'starting game...',
    });
  });

  // If a user presses basta
  socket.on('basta', (data) => {
    console.log('user pressed basta');
    /* THIS MIGHT MAKE THE USER WHO CLICKED BASTA TO SUBMIT
       THEIR RESULTS AGAIN */
    io.sockets.emit('basta', {
      message: 'STOP'
    });
  });

  socket.on('add to results', (data) => {
    let isPresent = false;
    results.forEach((element) => {
      if(element.playername === data.playername) { isPresent = true; }
    });
    if(!isPresent) { 
      console.log(`adding ${data.playername}'s results`);
      results.push(data);
    }
    if(results.length >= users.length) {
      let tempResults = [...results];
      results = new Array(0);
      tempResults.forEach((element) => {
        console.log(element.playername);
      });
      io.sockets.emit('results', tempResults);
    }
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    ready = false;
    if(addedUser) {
      --numUsers;
      users = users.filter((username) => username !== socket.username);
      addedUser = false;
      console.log('user left');
      console.log(`num of users: ${numUsers}`);
    }

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
