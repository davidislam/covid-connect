import React, { Component } from 'react';
import AddCentre from './AddCentre';
import RemoveCentre from './RemoveCentre';
import ModifyCentre from './ModifyCentre';
import Appointments from './Appointments';
import { getUserAppointments } from './../../../actions/appointment';
import CustomizedSnackbar from '../../CustomizedSnackbar';
import { toggle } from './../../../utils';

// INTEGRATION BELOW NEWS ---------------------------------------------
import AddNews from './../../Home/NewsArticles/AddNews';
import RemoveNews from './../../Home/NewsArticles/RemoveNews';
// --------------------------------------------------------------------

class AdminView extends Component {
  state = {
    appointments: [],
    snackbarMessage: "",
    snackbarSeverity: "",
    snackbarOpen: false,
  }

  componentDidMount() {
    getUserAppointments(this);
  }

  render() {
    const { username } = this.props;
    const { appointments, snackbarMessage, snackbarOpen, snackbarSeverity } = this.state;
    return (
      <React.Fragment>
        <h1>Hi {username}! What would you like to do today?</h1>
        <h2>Assessment Centres Modification</h2>
        <AddCentre />
        <br />
        <ModifyCentre />
        <hr style={{ maxWidth: '50%', marginTop: '30px', marginBottom: '30px' }} />
        <RemoveCentre />
        <hr style={{ maxWidth: '50%', marginTop: '30px', marginBottom: '30px' }} />

        {/* NEWS ARTICLE MOD ----------------------------------------------------   */}
        <h2> News Articles Modification</h2>
        <AddNews />
        <br />
        <RemoveNews />
        <br />
        {/* ENDS NEWS ARTICLE MOD -----------------------------------------------   */}

        <h2>Appointments</h2>
        <Appointments appointments={appointments} comp={this} />
        <CustomizedSnackbar
          message={snackbarMessage}
          severity={snackbarSeverity}
          open={snackbarOpen}
          toggleSnackbar={() => toggle(this, "snackbarOpen")}
        />
      </React.Fragment>
    );
  }
}

export default AdminView;
