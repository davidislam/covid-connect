import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Signin extends Component {
  state = {}
  render() {
    return (
      <div>
      <h1>Sign In</h1>
      <p>If you haven't created an account yet, then <Link to="/Signup">sign up</Link> instead.</p>

      </div>
      );
  }
}

export default Signin;