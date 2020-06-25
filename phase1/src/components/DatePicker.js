// import 'date-fns';
import React, { useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function DatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label={props.label}
        format="dd/MM/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{ 'aria-label': 'change date' }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker;