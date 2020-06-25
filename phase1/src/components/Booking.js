import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DatePicker from './DatePicker';
import { Link } from 'react-router-dom';

import './booking.css'

class Booking extends Component {
  state = { date: new Date() }

  onDateChange = date => {
    // console.log(date);
    this.setState({ date })
  }

  render() {
    return (
      <div>
        <h1>Schedule an appointment</h1>
        <DatePicker label="Choose a date" onChange={this.onDateChange} />
        <div className="container">
          <Link to={{
            pathname: '/centres',
            state: {
              selected_date: this.state.date.toLocaleDateString()
            }
          }} className="link">
            <Button variant="contained" color="primary">
              Show Assessment Centres
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Booking;