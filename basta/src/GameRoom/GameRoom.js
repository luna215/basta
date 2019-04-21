import React from "react";
import socketIOClient from "socket.io-client";

import PrimaryHeading from "../PrimaryHeading";

import "./GameRoom.css";

export default class GameRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoint: "http://127.0.0.1:4001",
      nombre: "",
      apellido: "",
      ciudad: "",
      fruta: "",
      cosa: "",
      animal: ""
    };
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('basta', () => {
      socket.emit('add to results', {
        playername: this.props.playername,
        nombre: this.state.nombre,
        apellido: this.state.apellido,
        ciudad: this.state.ciudad,
        fruta: this.state.fruta,
        cosa: this.state.cosa,
        animal: this.state.animal
      });
    });
  }

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => {
        console.log(this.state);
      }
    );
  };

  sendForm = (event) => {
    event.preventDefault();
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('basta', '');
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <PrimaryHeading class="playerName" message={this.props.playername} />
        <form className="container" noValidate autoComplete="off">
          <input
            placeholder="Nombre"
            onChange={this.handleChange("nombre")}
            value={this.state.nombre}
          />
          <input
            placeholder="Apellido"
            onChange={this.handleChange("apellido")}
            value={this.state.apellido}
          />
          <input
            placeholder="Ciudad"
            onChange={this.handleChange("ciudad")}
            value={this.state.ciudad}
          />
          <input
            placeholder="Fruta/Flor"
            onChange={this.handleChange("fruta")}
            value={this.state.fruta}
          />
          <input
            placeholder="Cosa"
            onChange={this.handleChange("cosa")}
            value={this.state.cosa}
          />
          <input
            placeholder="Animal"
            onChange={this.handleChange("animal")}
            value={this.state.animal}
          />
          <button onClick={this.sendForm}>Basta</button>
        </form>
      </div>
    );
  }
}
