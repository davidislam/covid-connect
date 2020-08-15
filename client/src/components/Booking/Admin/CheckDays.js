import React from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import { daysCapitalized, toggle } from './../../utils';


export default function (props) {
  const { comp } = props;
  return (
    <FormGroup row required>
      {daysCapitalized.map((day, i) => (
        <FormControlLabel key={i}
          control={
            <Checkbox name={day.toLowerCase()} checked={comp.state[day.toLowerCase()]} color="primary" onChange={() => toggle(comp, day.toLowerCase())} />
          }
          label={day}
        />
      ))}
    </FormGroup>
  )
}
