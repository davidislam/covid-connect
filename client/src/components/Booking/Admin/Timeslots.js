import React, { Component } from 'react';


export default class Timeslots extends Component {
  render() {
    return this.props.timeslots((ts) => (
      <TimeslotItem key={ts._id} ts={ts} delTodo={this.props.delTodo} />
    ));
  }
}