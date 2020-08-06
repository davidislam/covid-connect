import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { uid } from 'react-uid';


export default function (props) {
  const { label, arr, value, name, onChange, w } = props;
  return (
    <FormControl required>
      <InputLabel>{label}</InputLabel>
      <Select value={value} name={name} onChange={onChange} style={{ width: w }}>
        {arr.map(e =>
          <MenuItem key={uid(e)} value={e}>{e}</MenuItem>)}
      </Select>
    </FormControl>
  )
}