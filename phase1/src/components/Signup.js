import React, { Component } from 'react';

class Signup extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Sign Up</h1>

        <form action="">
          <label for="formUserName">User Name:</label> <br />
          <input type="text" id="formUserName" name="formUserName" /><br /><br />

          <label for="formPassword">Password:</label> <br />
          <input type="password" id="formPassword" name="formPassword" /><br /><br />

          <label for="formEmail">Email:</label> <br />
          <input type="text" id="formEmail" name="formEmail" /><br /><br />

          <label for="formFN">First Name:</label> <br />
          <input type="text" id="formFN" name="formFN" /><br /><br />

          <label for="formLN">Last Name:</label> <br />
          <input type="text" id="formLN" name="formLN" /><br /><br />

          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default Signup;
