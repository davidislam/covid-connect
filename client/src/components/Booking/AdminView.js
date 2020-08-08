import React, { Component } from 'react';
import AddCentre from './AddCentre';
import RemoveCentre from './RemoveCentre';
import ModifyCentre from './ModifyCentre';


class AdminView extends Component {
  state = {}
  render() {
    const { username } = this.props;
    return (
      <div>
        <h1>Hi {username}! What would you like to do today?</h1>
        <AddCentre />
        <br />
        <ModifyCentre />
        <hr style={{ maxWidth: '50%', marginTop: '30px', marginBottom: '30px' }} />
        <RemoveCentre />
      </div>
    );
  }
}

export default AdminView;