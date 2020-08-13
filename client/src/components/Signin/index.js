import React, { Component } from 'react';
import SigninComponent from './Signin';
import SignupButton from './SignupButton';
import CustomizedSnackbar from './../CustomizedSnackbar';
import { toggle } from './../../utils';


class Signin extends Component {
  state = {
    showSnackbar: false,
    message: '',
    severity: ''
  }

  render() {
    const { message, showSnackbar, severity } = this.state;
    return (
      <React.Fragment>
        <h1>Sign In</h1>
        <SigninComponent app={this.props.app} signin={this} />
        <SignupButton />
        <CustomizedSnackbar message={message} severity={severity} open={showSnackbar} toggleSnackbar={() => toggle(this, "showSnackbar")} />
      </React.Fragment>
    );
  }
}

export default Signin;
