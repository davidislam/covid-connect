import React, { Component } from 'react';
import AddCentre from './AddCentre';
import RemoveCentre from './RemoveCentre';
import ModifyCentre from './ModifyCentre';


class AdminView extends Component {
  render() {
    const { username } = this.props;
    return (
      <React.Fragment>
        <h1>Hi {username}! What would you like to do today?</h1>
        <AddCentre />
        <br />
        {/* <ModifyCentre /> */}
        <hr style={{ maxWidth: '50%', marginTop: '30px', marginBottom: '30px' }} />
        {/* <RemoveCentre /> */}
        {/* Show a list of timeslots */}
      </React.Fragment>
    );
  }
}

export default AdminView;