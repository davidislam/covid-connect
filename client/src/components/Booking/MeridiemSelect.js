import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { handleChange } from './../../utils';


export default function (props) {
  const { comp, name, value } = props;
  return (
    <FormControl >
      <Select value={value} name={name} onChange={(e) => handleChange(comp, e)} autoWidth={true}>
        <MenuItem value='AM'>AM</MenuItem>
        <MenuItem value='PM'>PM</MenuItem>
      </Select>
    </FormControl>
  )
}