import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CustomizedSnackbar from './../CustomizedSnackbar';
import Timeslot from './Timeslot';
import { handleChange, toggle } from './../../utils';
import { addAppointment } from './../../actions/centre';


export default class HoursForm extends Component {
  state = {
    timeslots: this.props.timeslots,
    chosenTimeId: "",
    errorMessage: "",
    showSnackbar: false,
    snackbarMessage: '',
    snackbarSeverity: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    const { cid, day, formattedDate, formattedAddress } = this.props;

    if (this.state.chosenTimeId === "") {
      this.setState({ errorMessage: 'Please choose a timeslot' });
      return;
    }
    // if (!this.props.isLoggedIn) {
    //   this.setState({
    //     snackbarMessage: 'You must be logged in to book an appointment',
    //     snackbarSeverity: 'warning', showSnackbar: true
    //   });
    //   return;
    // }

    // Get time value of chosen timeslot
    const time = this.state.timeslots.filter(ts => ts._id === this.state.chosenTimeId)[0].time;
    const appt = { date: formattedDate, time, address: formattedAddress, tid: this.state.chosenTimeId };
    // addAppointment(this, cid, day, appt);
    // changeTimeslotIsTaken(this, cid, day, this.state.chosenTimeId);

    // let chosenTimeslot;

    // // Update chosen timeslot's <is_taken> value
    // const updatedTimeslots = this.state.timeslots.map(t => {
    //   if (t.time === this.state.chosenTimeId) {
    //     t.isTaken = true;
    //     chosenTimeslot = t;
    //   }
    //   return t;
    // })

    // // Issue a rerender
    // this.setState({
    //   timeslots: updatedTimeslots
    // })

    // // Add appointment to user's appt list
    // // *Code below requires a server call*
    // // Add id
    // const appt = { date: this.props.formattedDate, timeslot: chosenTimeslot, address: this.props.formattedAddress }
    // this.props.addAppt(appt);

    // // Confirmation message
    // this.setState({
    //   errorMessage: '', showSnackbar: true,
    //   snackbarMessage: "Appointment details have been added to your profile", snackbarSeverity: 'success'
    // });
  }

  render() {
    const { heading } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <h4> <WatchLaterIcon color='primary' fontSize='small' className='icon' />  {heading}</h4>
        <RadioGroup name='chosenTimeId' value={this.state.chosenTimeId} onChange={e => handleChange(this, e)}>
          {this.state.timeslots.map((timeslot) => (
            <Timeslot key={timeslot._id} timeslot={timeslot} />
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
          toggleSnackbar={() => toggle(this, 'showSnackbar')} />
      </form>
    )
  }
}