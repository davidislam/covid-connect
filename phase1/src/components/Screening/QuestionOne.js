import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';


export default function QuestionOne(props){
    return (
        <div>
          <h1>COVID-19 Screening Tool</h1>
          <FormControl component="fieldset">
            <FormLabel component="legend">Is this an emergency?</FormLabel>
            <RadioGroup aria-label="q1" name="q1" onChange={props.handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
            <Button type="submit" onClick={props.restart} variant="outlined" color="primary" className={useStyles.button}>
              Restart
            </Button>
            <Button type="submit" onClick={props.nextQuestion} variant="outlined" color="primary" className={useStyles.button}>
              Next
            </Button>
          </FormControl>
        </div>
      );
  }