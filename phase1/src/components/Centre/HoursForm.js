import React, { Component } from 'react';
import { uid } from 'react-uid';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CustomizedSnackbar from './../CustomizedSnackbar';

import Timeslot from './Timeslot';

export default class HoursForm extends Component {
  state = {
    timeslots: this.props.timeslots,
    chosenTime: "",
    errorMessage: "",
    showSnackbar: false,
    snackbarMessage: '',
    snackbarSeverity: ''
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.chosenTime === "") {
      this.setState({ errorMessage: 'Please choose a timeslot' });
      return;
    }

    if (!this.props.isLoggedIn) {
      this.setState({
        snackbarMessage: 'You must be logged in to book an appointment',
        snackbarSeverity: 'warning', showSnackbar: true
      });
      return;
    }

    let chosenTimeslot;

    // Update chosen timeslot's <is_taken> value
    const updatedTimeslots = this.state.timeslots.map(t => {
      if (t.time === this.state.chosenTime) {
        t.is_taken = true;
        chosenTimeslot = t;
      }
      return t;
    })

    // Issue a rerender
    this.setState({
      timeslots: updatedTimeslots
    })

    // Add appointment to user's appt list
    // *Code below requires a server call*
    const appt = { date: this.props.formattedDate, timeslot: chosenTimeslot, address: this.props.formattedAddress }
    this.props.addAppt(appt);

    // Confirmation message
    this.setState({
      errorMessage: '', showSnackbar: true,
      snackbarMessage: "Appointment details have been added to your profile", snackbarSeverity: 'success'
    });
  }

  handleRadioChange = e => this.setState({ chosenTime: e.target.value });

  toggleSnackbar = () => { this.setState(state => ({ showSnackbar: !state.showSnackbar })) };

  render() {
    const { heading } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h4> <WatchLaterIcon color='primary' fontSize='small' className='icon' />  {heading}</h4>
        <RadioGroup value={this.state.chosenTime} onChange={this.handleRadioChange}>
          {this.state.timeslots.map((timeslot) => (
            <Timeslot key={uid(timeslot)} timeslot={timeslot} />
          ))}
        </RadioGroup>
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