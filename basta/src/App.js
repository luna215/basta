import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import WaitRoom from "./WaitRoom/WaitRoom";
import GameRoom from "./GameRoom/GameRoom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:4001",
      message: "Waiting for more players...",
      ready: false,
      playing: false,
      numUsers: 0
    };
  }

  // We need to initial request in this function.
  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);

    socket.on("user ready", data => {
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
    socket.emit('pressed play', 'hello');

    this.setState({ playing: true });
  };

  // TODO: make two separate components.
  // One when we are waiting for another player,
  // And another when we are ready to play the game!
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h5" color="inherit">
              Basta
            </Typography>
          </Toolbar>
        </AppBar>
        {this.state.playing ? (
          <GameRoom />
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
