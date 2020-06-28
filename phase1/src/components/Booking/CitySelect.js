import React from 'react';
import { uid } from 'react-uid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function CitySelect(props) {
  return (
    <div>
      <FormControl className="city-select">
        <InputLabel id="city-select-label">{props.label}</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          value={props.value}
          name="city"
          onChange={props.onChange}
          required
        >
          {props.cities.map(c => (
            <MenuItem key={uid(c)} value={c}>{c}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}