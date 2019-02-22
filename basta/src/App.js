import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:4001",
      color: "white",
      message: "Waiting for more players...",
      ready: false,
    };
  }

  // We need to initial request in this function.
  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);

    socket.on("user ready", message => {
      console.log("changing message");
      document.getElementById("message").innerText = message;
      this.setState({ready: true})
    });
  }

  // TODO: make two separate components. 
  // One when we are waiting for another player, 
  // And another when we are ready to play the game!
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 id="message">Waiting for one more player...</h1>
        <button style={{display: this.state.ready ? "block": "none"}}>Play</button> 
      </div>
    );
  }
}
export default App;
