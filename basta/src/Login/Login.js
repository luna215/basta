import React from "react";
import socketIOClient from "socket.io-client";

import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css'; // optional styles

import "./Login.css";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://127.0.0.1:4001",
            name: '',
        };
        this.container = undefined;
    }

    setName = event => {
        this.setState({ name: event.target.value });
    }

    handleEnter = event => {
        if (event.keyCode === 13) {
            if (this.state.name !== '') {
                const socket = socketIOClient(this.state.endpoint);
                if (this.props.users.includes(this.state.name)) {
                    // TODO: 
                    // Display message using toastr that username is already taken
                    toaster.notify('Username is already taken', {
                        type: 'success',
                        position: 'top-right',
                        duration: 20000
                      });
                } else {
                    socket.emit('add user', this.state.name);
                    this.props.setName(this.state.name);
                }
            }
        }
    }

    render() {
        return <div className="login page">
            <div className="form">
                <h3 className="title">Enter a name:</h3>
                <input className="usernameInput" type="text" maxLength="14" onChange={this.setName} onKeyUp={this.handleEnter} />
            </div>
        </div>
    }
} 