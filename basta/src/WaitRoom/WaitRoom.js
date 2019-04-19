import React, { Component } from "react";
import PrimaryHeading from "../PrimaryHeading";

export default class WaitRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: this.props.ready
    };
  }

  play = () => {
    this.props.play();
  }

  render() {
    return (
      <>
        <PrimaryHeading class={this.props.class} message={this.props.message} />
        <p>You can invite them using this link: <a href="http://localhost:3000">localhost:3000</a></p>
        <button
              onClick={this.play}
              style={{
                margin: "0 auto",
                display: this.props.ready ? "block" : "none"
              }}
            >
              Play
            </button>
      </>
    );
  }
}
