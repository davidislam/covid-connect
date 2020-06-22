import React, { Component } from 'react';
import DatePicker from './DatePicker';

class Booking extends Component {
  state = {}
  render() {
    return (
      <div>
        <h1>Schedule an appointment</h1>
        <DatePicker label="Choose a date" />
      </div>

    );
  }
}

export default Booking;