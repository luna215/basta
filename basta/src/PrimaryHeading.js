import React from 'react';

export default class PrimaryHeading extends React.Component {    
    render() {
        return <h1 className={this.props.class}>{this.props.message}</h1>
    }
} 