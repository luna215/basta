import React, { Component } from "react";

import socketIOClient from "socket.io-client";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import WaitRoom from "./WaitRoom/WaitRoom";
import GameRoom from "./GameRoom/GameRoom";
import Login from "./Login/Login";
import ResultsRoom from './ResultsRoom/ResultsRoom'

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:4001",
      name: '',
      message: "Waiting for more players...",
      ready: false,
      playing: false,
      numUsers: 0,
      room: 'login',
      results: {}
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
      this.setState({ playing: true, room: 'playing'});
    });

    socket.on('wait for players', (data) => {
      if(data.numUsers < 2 && data.numUsers > 0) {
        this.setState({playing: false, ready: false, message: data.message, room: 'waiting'});
      } else {
        this.setState({playing: false, ready: false, message: data.message, room: this.state.room});
      }
    });

    socket.on('results', (data) => {
      this.setState({room: 'results', results: data});
    })
  }

  play = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('pressed play', '');

    this.setState({ playing: true, room: 'playing'});
  };

  setName = (name) => {
    console.log(`setting name: ${name}`);
    this.setState({name, room: 'waiting'});
  }

  displayRoom = (room) => {
    switch(room) {
      case 'login':
        return <Login setName={this.setName} />;
      case 'waiting':
        return <WaitRoom
                  class="message"
                  message={this.state.message}
                  play={this.play}
                  ready={this.state.ready} />;
      case 'playing':
        return <GameRoom playername={this.state.name} />;
      case 'results':
        return <ResultsRoom results={this.state.results}/>
      default:
        return null;
    }
  }
  render() {
    console.log(this.state.room);
    return (
      <div style={{ textAlign: "center" }}>
        {/* {this.state.name === '' ? (<Login setName={this.setName} />) : (<></>)} */}
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h5" color="inherit">
              Basta
            </Typography>
          </Toolbar>
        </AppBar>
        {this.displayRoom(this.state.room)}
        {/* {this.state.playing ? (
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
        )} */}
      </div>
    );
  }
}
export default App;
