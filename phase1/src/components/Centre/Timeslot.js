import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


export default function Timeslot(props) {
  const [state, setState] = useState({ checked: false });

  const { timeslot, addTime, removeTime } = props;

  const handleChange = e => {
    const isChecked = e.target.checked;
    if (isChecked) {
      addTime(timeslot)
    } else {
      removeTime(timeslot);
    }
    setState({ checked: isChecked });
  }

  let element;
  if (timeslot.is_taken) {
    element = <FormControlLabel
      disabled
      control={
        <Checkbox
          checked={state.checked}
          onChange={handleChange}
          name='checked'
          color='primary'
        />
      }
      label={timeslot.time}
    />
  } else {
    element = <FormControlLabel
      control={
        <Checkbox
          checked={state.checked}
          onChange={handleChange}
          name='checked'
          color='primary'
        />
      }
      label={timeslot.time}
    />
  }

  return element;
}