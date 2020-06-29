import React, { Component } from 'react';
import SignupComponent from './Signup'

class Signup extends Component {
  state = {}
  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <SignupComponent />
      </div>
      );
  }
}

export default Signup;
