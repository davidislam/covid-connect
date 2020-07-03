import React, { Component } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import Checkbox from '@material-ui/core/Checkbox';

class Screening extends Component {
  constructor(props) {
    super(props);
    this.state = {started: false, numAnswered: 0, q1: null, q2: 0, q3: null}
  }

  startScreen = () => {
    this.setState({started: true});
  }

  nextQuestion = () => {
    this.setState({numAnswered: this.state.numAnswered + 1})
  }

 restart = () => {
    this.setState({started: false, numAnswered: 0, q1: null, q2: 0, q3: null})
  }

  handleChange = (event) => {
    if (this.state.numAnswered === 0) {
      this.setState({q1: event.target.value})
    } else if (this.state.numAnswered === 1) {
      if (event.target.checked === true){
        this.setState({q2: this.state.q2 + 1});
      } else if (event.target.checked === false){
        this.setState({q2: this.state.q2 - 1})
      }
    } else if (this.state.numAnswered === 2) {
      this.setState({q3: event.target.value});
    }
  }

  render() {
    if (!this.state.started) {
      return (
        <div>
          <h1>COVID-19 Screening Tool</h1>
          <p>This tool can help you understand what if you feel you are exposed to COVID-19. </p>
          <p>Let’s all look out for each other! Know your own condition, try not to infect others, and reserve care for those in need.</p>
          <Button type="button" onClick={this.startScreen} variant="outlined" color="primary" className={useStyles.button}> Start Screening</Button>
        </div>
      );
    } else if (this.state.numAnswered === 0) {
      return (
        <div>
          <h1>COVID-19 Screening Tool</h1>
          <FormControl component="fieldset">
            <FormLabel component="legend">Is this an emergency?</FormLabel>
            <RadioGroup aria-label="q1" name="q1" onChange={this.handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
            <Button type="submit" onClick={this.restart} variant="outlined" color="primary" className={useStyles.button}>
              Restart
            </Button>
            <Button type="submit" onClick={this.nextQuestion} variant="outlined" color="primary" className={useStyles.button}>
              Next
            </Button>
          </FormControl>
        </div>
      );
    } else if (this.state.q1 === "Yes") {
      return (
      <div>
        <h1>COVID-19 Screening Tool</h1>
        <p>Based on your response, you should call 911.</p>
        <Button type="submit" onClick={this.restart} variant="outlined" color="primary" className={useStyles.button}>
          Ok
        </Button>
      </div>
      )
    } else if (this.state.numAnswered === 1) {
      return (
        <div>
          <h1>COVID-19 Screening Tool</h1>
          <FormControl component="fieldset">
            <FormLabel component="legend">Have you recently started experiencing any of these symptoms? If not, click next without checking any boxes.</FormLabel>
            <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={this.handleChange} />}
              label="Fever or chills"
            />
            <FormControlLabel
              control={<Checkbox onChange={this.handleChange} />}
              label="Mild or moderate difficulty breathing"
            />
            <FormControlLabel
              control={<Checkbox onChange={this.handleChange} />}
              label="New or worsening cough"
            />
            <FormControlLabel
              control={<Checkbox onChange={this.handleChange} />}
              label="Sustained loss of smell, taste, or appetite"
            />
            <FormControlLabel
              control={<Checkbox onChange={this.handleChange} />}
              label="Sore throat"
            />
            <FormControlLabel
              control={<Checkbox onChange={this.handleChange} />}
              label="Vomiting or diarrhea"
            />
            <FormControlLabel
              control={<Checkbox onChange={this.handleChange} />}
              label="Aching throughout the body"
            />
          </FormGroup>
          <Button type="submit" onClick={this.restart} variant="outlined" color="primary" className={useStyles.button}>
              Restart
            </Button>
          <Button type="submit" onClick={this.nextQuestion} variant="outlined" color="primary" className={useStyles.button}>
              Next
          </Button>
          </FormControl>
        </div>
      )
    } else if (this.state.numAnswered === 2) {
      return (
        <div>
          <h1>COVID-19 Screening Tool</h1>
          <FormControl component="fieldset">
            <FormLabel component="legend">In the last 14 days, have you traveled internationally?</FormLabel>
            <RadioGroup aria-label="q1" name="q1" onChange={this.handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="I have traveled internationally" />
              <FormControlLabel value="No" control={<Radio />} label="I have not traveled internationally" />
            </RadioGroup>
            <Button type="submit" onClick={this.restart} variant="outlined" color="primary" className={useStyles.button}>
              Restart
            </Button>
            <Button type="submit" onClick={this.nextQuestion} variant="outlined" color="primary" className={useStyles.button}>
              Submit
            </Button>
          </FormControl>
        </div>
      );
    } else if (this.state.numAnswered === 3 && this.state.q2 === 0) {
      return (
        <div>
          <h1>COVID-19 Screening Tool</h1>
          <p>Based on your response, you do not need a COVID-19 test at the moment.</p>
          <Button type="submit" onClick={this.restart} variant="outlined" color="primary" className={useStyles.button}>
          Ok
        </Button>
        </div>
        )
    } else {
      return (
        <div>
          <h1>COVID-19 Screening Tool</h1>
          <p>Based on your response, you should take a COVID-19 test. Please create an account and make a booking now.</p>
          <Button type="submit" onClick={this.restart} variant="outlined" color="primary" className={useStyles.button}>
          Ok
        </Button>
        </div>
        )
    }
    
  }


}



export default Screening;
