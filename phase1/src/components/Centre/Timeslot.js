import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function Timeslot(props) {
  const [state, setState] = useState({ isChecked: false })
  const { timeslot, handleCheckboxChange } = props;

  const handleChange = () => {
    setState({ ...state, isChecked: !state.isChecked });
    handleCheckboxChange(timeslot.time);
  }

  let element;
  if (timeslot.is_taken) {
    element = <FormControlLabel
      disabled
      control={
        <Checkbox
          checked={true}
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
          onChange={handleChange}
          name='isChecked'
          color='primary'
          checked={state.isChecked}
        />
      }
      label={timeslot.time}
    />
  }

  return element;
}