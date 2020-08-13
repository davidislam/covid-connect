import React, { Component } from 'react';
import SigninComponent from './Signin';
import SignupButton from './SignupButton';


class Signin extends Component {
  constructor(props) {
    super(props);
    this.props.history.push('/signin');
  }

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <SigninComponent app={this.props.app} />
        <SignupButton />
      </div>
    );
  }
}

export default Signin;
