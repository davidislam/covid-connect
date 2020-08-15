import React, { Component } from 'react';
import { deleteTimeslot } from './../../../actions/centre';
import TimeslotItem from './TimeslotItem';


export default class Timeslots extends Component {
  render() {
    return this.props.timeslots.map((ts) => (
      <TimeslotItem key={ts.id} ts={ts} delTimeslot={(day, tid) => deleteTimeslot(day, tid, this.props.comp)} />
    ));
  }
}