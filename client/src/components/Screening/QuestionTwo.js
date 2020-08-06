import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import Checkbox from '@material-ui/core/Checkbox';


export default function QuestionTwo(props){
    return (
        <div>
          <h1>COVID-19 Screening Tool</h1>
          <FormControl component="fieldset">
            <FormLabel component="legend">Have you recently started experiencing any of these symptoms? If not, click next without checking any boxes.</FormLabel>
            <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={props.handleChange} />}
              label="Fever or chills"
            />
            <FormControlLabel
              control={<Checkbox onChange={props.handleChange} />}
              label="Mild or moderate difficulty breathing"
            />
            <FormControlLabel
              control={<Checkbox onChange={props.handleChange} />}
              label="New or worsening cough"
            />
            <FormControlLabel
              control={<Checkbox onChange={props.handleChange} />}
              label="Sustained loss of smell, taste, or appetite"
            />
            <FormControlLabel
              control={<Checkbox onChange={props.handleChange} />}
              label="Sore throat"
            />
            <FormControlLabel
              control={<Checkbox onChange={props.handleChange} />}
              label="Vomiting or diarrhea"
            />
            <FormControlLabel
              control={<Checkbox onChange={props.handleChange} />}
              label="Aching throughout the body"
            />
          </FormGroup>
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