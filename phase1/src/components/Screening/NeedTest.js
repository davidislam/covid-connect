import React from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';


export default function NeedTest(props){
    return (
        <div>
          <h1>COVID-19 Screening Tool</h1>
          <p>Based on your response, you do NOT need a COVID-19 test.</p>
          <Button type="submit" onClick={props.restart} variant="outlined" color="primary" className={useStyles.button}>
          Ok
          </Button>
        </div>
      );
  }