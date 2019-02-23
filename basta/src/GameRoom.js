import React from "react";
import PrimaryHeading from "./PrimaryHeading";
import TextField from "@material-ui/core/TextField";

export default class GameRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      appellido: "",
      ciudad: "",
      fruta: "",
      cosa: "",
      animal: ""
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    return (
      <div>
        <PrimaryHeading class="playerName" message="Player Name" />
        <TextField 
          label="Nombre" 
          value="" 
          onChange={this.handleChange("nombre")}
          margin="normal" 
          variant="outlined" 
        />
        <TextField
          id="outlined-name"
          label="Apellido"
          value=""
          onChange={this.handleChange("appellido")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Fruta/Flor"
          value=""
          onChange={this.handleChange('fruta')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Ciudad"
          value=''
          onChange={this.handleChange('ciudad')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Cosa"
          value=''
          onChange={this.handleChange('cosa')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Animal"
          value={this.state.name}
          onChange={this.handleChange('animal')}
          margin="normal"
          variant="outlined"
        />
      </div>
    );
  }
}
