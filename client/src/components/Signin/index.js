import React, { Component } from 'react';
import SigninComponent from './Signin'
import SignupButton from './SignupButton'

class Signin extends Component {
  state = {}
  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <SigninComponent onLogin={this.props.onLogin} changeUsername={this.props.changeUsername} onAdmin={this.props.onAdmin} />
        <SignupButton />
      </div>
    );
  }
}

export default Signin;
