import React, { Component } from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { addTimeslot } from '../../actions/centre';
import TimeSelect from './TimeSelect';
import MeridiemSelect from './MeridiemSelect';
import CheckDays from './CheckDays';


export default class AddTimeslot extends Component {
  populateTime = () => {
    let timeArr = [];
    for (let i = 1; i < 13; i++) {
      const time = `${i}:00`;
      timeArr.push(time);
    }
    return timeArr;
  }

  render() {
    const { daysText, timeText, comp } = this.props;
    const { startTime, startMeridiem, endTime, endMeridiem } = this.props.comp.state;
    return (
      <React.Fragment>
        <DialogContentText>
          {daysText}
        </DialogContentText>
        <CheckDays comp={comp} />
        <DialogContentText>
          {timeText}
        </DialogContentText>
        <div style={timeStyles}>
          <TimeSelect
            comp={comp}
            text='From'
            arr={this.populateTime()}
            time={startTime}
            name="startTime"
          />
          <MeridiemSelect comp={comp} name="startMeridiem" value={startMeridiem} />
          <TimeSelect
            comp={comp}
            text='To'
            arr={this.populateTime()}
            time={endTime}
            name="endTime"
          />
          <MeridiemSelect comp={comp} name="endMeridiem" value={endMeridiem} />
        </div>
        <Button color="secondary" onClick={() => addTimeslot(comp)} style={btnStyle}>
          Add timeslot
        </Button>
      </React.Fragment>
    )
  }
}

const timeStyles = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-evenly",
  alignItems: "baseline",
  marginBottom: "10px"
};

const btnStyle = {
  marginLeft: '40%',
}
