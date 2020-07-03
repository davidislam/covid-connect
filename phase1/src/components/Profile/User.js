import React, { Component } from 'react';
import ApptTable from './ApptTable';


class User extends Component {
  state = {}
  render() {
    return (
      <div>
        <h3>{this.props.username}</h3>
        <ApptTable appointments={this.props.appointments} deleteAppt={appt => this.props.deleteAppt(appt)} />
      </div>
    )
  }
}

export default User;