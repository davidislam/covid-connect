import React, { Component } from 'react';
import { uid } from 'react-uid';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CustomizedSnackbar from './../CustomizedSnackbar';

import Timeslot from './Timeslot';

export default class HoursForm extends Component {
  state = {
    timeslots: this.props.timeslots,
    errorMessage: "",
    showSnackbar: false,
    snackbarMessage: '',
    snackbarSeverity: ''
  }

  componentDidMount() {
    this.selected_times = new Set();
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.selected_times.size === 0) {
      this.setState({ errorMessage: 'Please choose a timeslot' });
      return;
    }

    if (!this.props.isLoggedIn) {
      this.setState({
        snackbarMessage: 'You must be logged in to book an appointment',
        snackbarSeverity: 'error', showSnackbar: true
      });
      return;
    }

    // Update timeslots' <is_taken> value
    const updatedTimeslots = this.state.timeslots.map(t => {
      if (this.selected_times.has(t.time)) {
        t.is_taken = true;
      }
      return t;
    })

    this.setState({
      timeslots: updatedTimeslots
    })

    // Get only the selected ones
    const selectedTimeslots = updatedTimeslots.filter(timeslot => {
      return this.selected_times.has(timeslot.time)
    })

    // Add appointment to user's appt list for each selected timeslot
    selectedTimeslots.forEach(timeslot => {
      const appt = { date: this.props.formattedDate, timeslot: timeslot, address: this.props.formattedAddress }
      this.props.addAppt(appt);
    });

    // Reset props
    this.selected_times = new Set();
    this.setState({
      errorMessage: '', showSnackbar: true,
      snackbarMessage: "Appointment details have been added to your profile", snackbarSeverity: 'success'
    });
  }

  toggleCheckbox = time => {
    if (this.selected_times.has(time)) {
      this.selected_times.delete(time);
    } else {
      this.selected_times.add(time);
    }
  }

  toggleSnackbar = () => { this.setState(state => ({ showSnackbar: !state.showSnackbar })) };

  render() {
    const { heading } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h4> <WatchLaterIcon color='primary' fontSize='small' className='icon' />  {heading}</h4>
        <FormGroup>
          {this.state.timeslots.map((timeslot) => (
            <Timeslot key={uid(timeslot)} timeslot={timeslot} handleCheckboxChange={this.toggleCheckbox} />
          ))}
        </FormGroup>
        <FormHelperText error={true}>{this.state.errorMessage}</FormHelperText>
        <Button type='submit' variant="contained" color="primary">
          Confirm
        </Button>
        <CustomizedSnackbar
          message={this.state.snackbarMessage}
          severity={this.state.snackbarSeverity}
          open={this.state.showSnackbar}
          toggleSnackbar={this.toggleSnackbar} />
      </form>
    )
  }
}