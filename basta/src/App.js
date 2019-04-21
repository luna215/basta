import React, { Component } from "react";

import socketIOClient from "socket.io-client";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import WaitRoom from "./WaitRoom/WaitRoom";
import GameRoom from "./GameRoom/GameRoom";
import Login from "./Login/Login";

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:4001",
      name: '',
      message: "Waiting for more players...",
      ready: false,
      playing: false,
      numUsers: 0
    };
  }

  // We need to initial request in this function.
  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);

    socket.on('login', (data) => {
      console.log(`${data.user} logged in.`);
      this.setState({ name: data.user });
    });

    socket.on("user ready", (data) => {
      this.setState({ ready: true, numUsers: data.numUsers, message: data.message});
    });

    socket.on('user pressed play', (data) => {
      console.log(data.message);
      this.setState({ playing: true });
    });

    socket.on('wait for players', (data) => {
      this.setState({playing: false, ready: false, message: data.message});
    });
  }

  play = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('pressed play', '');

    this.setState({ playing: true });
  };

  setName = (name) => {
    console.log(`setting name: ${name}`);
    this.setState({name});
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.name === '' ? (<Login setName={this.setName} />) : (<></>)}
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h5" color="inherit">
              Basta
            </Typography>
          </Toolbar>
        </AppBar>
        {this.state.playing ? (
          <GameRoom playername={this.state.name} />
        ) : (
          <>
            <WaitRoom
              ready={this.state.ready}
              play={this.play}
              class="message"
              message={this.state.message}
            />
          </>
        )}
      </div>
    );
  }
}
export default App;
