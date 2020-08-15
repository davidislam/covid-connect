import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { handleChange } from './../../utils';


export default function (props) {
  const { text, comp, arr, name, time } = props;
  return (
    <FormControl >
      <InputLabel>{text}</InputLabel>
      <Select value={time} name={name} onChange={(e) => handleChange(comp, e)} autoWidth={true}>
        {arr.map((time, i) =>
          <MenuItem key={i} value={time}>{time}</MenuItem>)}
      </Select>
    </FormControl>
  )
}