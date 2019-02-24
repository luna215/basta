import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import MainMenu from "./MainMenu";
import GameRoom from "./GameRoom/GameRoom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:4001",
      color: "white",
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
      document.getElementsByClassName("message")[0].innerText = `${data.message}`;
      this.setState({ ready: true, numUsers: data.numUsers });
    });
  }

  play = () => {
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
            <MainMenu
              class="message"
              message="Waiting for 2nd player to join..."
            />
            <button
              onClick={this.play}
              style={{
                margin: "0 auto",
                display: this.state.ready ? "block" : "none"
              }}
            >
              Play
            </button>
          </>
        )}
      </div>
    );
  }
}
export default App;
