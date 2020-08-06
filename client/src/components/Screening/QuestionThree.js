import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';


export default function QuestionThree(props){
    return (
        <div>
          <h1>COVID-19 Screening Tool</h1>
          <FormControl component="fieldset">
            <FormLabel component="legend">In the last 14 days, have you traveled internationally?</FormLabel>
            <RadioGroup aria-label="q1" name="q1" onChange={props.handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="I have traveled internationally" />
              <FormControlLabel value="No" control={<Radio />} label="I have not traveled internationally" />
            </RadioGroup>
            <Button type="submit" onClick={props.restart} variant="outlined" color="primary" className={useStyles.button}>
              Restart
            </Button>
            <Button type="submit" onClick={props.nextQuestion} variant="outlined" color="primary" className={useStyles.button}>
              Submit
            </Button>
          </FormControl>
        </div>
      );
  }