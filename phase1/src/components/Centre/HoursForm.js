import React, { Component } from 'react';
import { uid } from 'react-uid';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';

import Timeslot from './Timeslot';

export default class HoursForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: []
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    // Pass selected timeslots into User's profile
    this.state.times.forEach(time => {
      time.is_taken = true;
    });
    alert("Appointment successfully scheduled");
  }

  addTime = time => {
    this.setState(state => ({
      times: state.times.concat([time])
    }))
  }

  removeTime = time => {
    const newTimes = this.state.times.filter(t => t !== time);
    this.setState({ times: newTimes });
  }

  render() {
    const { heading, timeslots } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>{heading}</h4>
        <FormGroup>
          {timeslots.map(timeslot => (
            <Timeslot key={uid(timeslot)} timeslot={timeslot} addTime={this.addTime} removeTime={this.removeTime} />
          ))}
        </FormGroup>
        <Button type='submit' variant="contained" color="primary">
          Confirm
          </Button>
      </form>
    )
  }
}