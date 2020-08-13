import React, { Component } from 'react';
import SignupComponent from './Signup'
import CustomizedSnackbar from './../CustomizedSnackbar';
import { toggle } from './../../utils';


class Signup extends Component {
  state = {
    showSnackbar: false,
    message: '',
    severity: ''
  }

  render() {
    const { message, showSnackbar, severity } = this.state;
    return (
      <React.Fragment>
        <h1>Sign Up</h1>
        <SignupComponent signup={this} />
        <CustomizedSnackbar message={message} severity={severity} open={showSnackbar} toggleSnackbar={() => toggle(this, "showSnackbar")} />
      </React.Fragment>
    );
  }
}

export default Signup;
