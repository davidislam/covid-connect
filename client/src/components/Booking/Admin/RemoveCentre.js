import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import CustomizedSnackbar from './../../CustomizedSnackbar';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { removeCentreById, getCentres } from './../../../actions/centre';
import { handleChange, toggle } from './../../../utils';


class RemoveCentre extends Component {
  state = {
    cid: '',
    centres: [],
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: ''
  }

  componentDidMount() {
    getCentres(this);
  }

  deleteCentre = () => {
    const { cid } = this.state
    if (cid !== '') {
      removeCentreById(this, cid);
    } else {
      const msg = 'Please select an assessment centre';
      this.setState({ snackbarOpen: true, snackbarMessage: msg, snackbarSeverity: 'warning' });
    }
  }

  render() {
    const { cid, centres, snackbarOpen, snackbarMessage, snackbarSeverity } = this.state;
    return (
      <React.Fragment>
        <h2>Delete a centre</h2>
        <FormControl required>
          <InputLabel>Name</InputLabel>
          <Select value={cid} name="cid" onChange={(e) => handleChange(this, e)} style={{ width: '50ch' }}>
            {centres.map(centre =>
              <MenuItem key={centre._id} value={centre._id}>{centre.name}</MenuItem>)}
          </Select>
        </FormControl>
        <div>
          <Button color='secondary' variant="contained"
            onClick={this.deleteCentre} style={{ marginTop: '30px' }}>
            Delete Selected Centre
          </Button>
        </div>
        <CustomizedSnackbar
          message={snackbarMessage}
          severity={snackbarSeverity}
          open={snackbarOpen}
          toggleSnackbar={() => toggle(this, 'snackbarOpen')}
        />
      </React.Fragment>
    );
  }
}

export default RemoveCentre;