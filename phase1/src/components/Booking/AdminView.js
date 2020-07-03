import React, { Component } from 'react';
import AddCentre from './AddCentre';
import RemoveCentre from './RemoveCentre';


class AdminView extends Component {
  state = {}
  render() {
    const { username } = this.props;
    return (
      <div>
        <h1>Hi {username}!</h1>
        <AddCentre />
        <RemoveCentre />
      </div>
    );
  }
}

export default AdminView;