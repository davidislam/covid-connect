import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DatePicker from './DatePicker';
import { Link } from 'react-router-dom';

class Booking extends Component {
  state = {}
  render() {
    return (
      <div>
        <h1>Schedule an appointment</h1>
        <DatePicker label="Choose a date" />
        <Link to='/centres'>
          <Button variant="contained" color="primary">
            Show Assessment Centres
        </Button>
        </Link>
      </div>
    );
  }
}

export default Booking;