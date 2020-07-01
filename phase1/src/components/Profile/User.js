import React, { Component } from 'react';

class User extends Component {
  state = {}
  render() {
    return (<h1>{this.props.username}</h1>);
  }
}

export default User;