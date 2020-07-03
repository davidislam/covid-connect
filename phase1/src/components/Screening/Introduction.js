import React from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';


export default function Introduction(props){
    return (
        <div>
          <h1>COVID-19 Screening Tool</h1>
          <p>This tool can help you understand what to do next about COVID-19. Let’s all look out for each other by knowing our status, trying not to infect others, and reserving care for those in need.</p>
          <Button type="button" onClick={props.startScreen} variant="outlined" color="primary" className={useStyles.button}> Start Screening</Button>
        </div>
      );
  }