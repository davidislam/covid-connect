import React, { Component } from 'react';
import { changeAppointmentStatusById } from './../../../actions/appointment';
import ApptItem from './ApptItem';


export default class Appointments extends Component {
  render() {
    return this.props.appointments.map((appt) => (
      <ApptItem key={appt.id} appt={appt} updateAppt={(id, status) => changeAppointmentStatusById(id, status, this.props.comp)} />
    ));
  }
}