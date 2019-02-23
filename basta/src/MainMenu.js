import React, { Component } from "react";
import PrimaryHeading from "./PrimaryHeading";

export default class MainMenu extends Component {
  render() {
    return (
      <>
        <PrimaryHeading class={this.props.class} message={this.props.message} />
        <p>You can invite them using this link: <a href="http://localhost:3000">localhost:3000</a></p>
      </>
    );
  }
}
