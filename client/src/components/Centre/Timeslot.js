import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';


export default function Timeslot(props) {
  const { timeslot } = props;

  let element;
  if (timeslot.isTaken) {
    element = <FormControlLabel
      disabled
      checked
      control={<Radio />}
      label={timeslot.time}
      value={timeslot.time}
    />
  } else {
    element = <FormControlLabel
      control={<Radio />}
      label={timeslot.time}
      value={timeslot.time}
    />
  }

  return element;
}