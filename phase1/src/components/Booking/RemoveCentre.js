import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import CustomizedSelect from './../CustomizedSelect';
import CustomizedSnackbar from './../CustomizedSnackbar';

import { removeCentre } from './../../actions/centre';
import { handleChange, toggle } from './../../utils';

import { CENTRES } from './../../data';


class RemoveCentre extends Component {
  state = {
    name: '',
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: ''
  }

  handleClick = () => {
    // code below requires server call
    const { name } = this.state
    if (name !== '') {
      const msg = `${name} has been removed`;
      removeCentre(this._getIndex(name));
      this.setState({ snackbarOpen: true, snackbarMessage: msg, snackbarSeverity: 'success', name: '' });
    } else {
      const msg = 'Please select an assessment centre';
      this.setState({ snackbarOpen: true, snackbarMessage: msg, snackbarSeverity: 'warning' });
    }
  }

  _getIndex = (name) => {
    for (let i = 0; i < CENTRES.length; i++) {
      if (CENTRES[i].name === name) {
        return i;
      }
    }
  }

  render() {
    const { name, snackbarOpen, snackbarMessage, snackbarSeverity } = this.state;
    // const snackbarSeverity = 'success';
    return (
      <div>
        <CustomizedSelect
          label="Name"
          value={name}
          name="name"
          onChange={(e) => handleChange(this, e)}
          w="40ch"
          arr={CENTRES.map((centre) => {
            return centre.name
          })}
        />
        <div>
          <Button color='secondary' variant="contained"
            onClick={this.handleClick} style={{ marginTop: '30px' }}>
            Delete Selected Centre
          </Button>
        </div>
        <CustomizedSnackbar
          message={snackbarMessage}
          severity={snackbarSeverity}
          open={snackbarOpen}
          toggleSnackbar={() => toggle(this, 'snackbarOpen')}
        />
      </div>
    );
  }
}

export default RemoveCentre;