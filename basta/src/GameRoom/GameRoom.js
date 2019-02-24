import React from "react";
import PrimaryHeading from "../PrimaryHeading";

import "./GameRoom.css";

export default class GameRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      apellido: "",
      ciudad: "",
      fruta: "",
      cosa: "",
      animal: ""
    };
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

  sendForm = event => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <PrimaryHeading class="playerName" message="Player Name" />
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
