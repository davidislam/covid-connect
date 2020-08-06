import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function DatePicker(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label={props.label}
        format="MM/dd/yyyy"
        value={props.value}
        onChange={props.onChange}
        KeyboardButtonProps={{ 'aria-label': 'change date' }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker;