import React, { Component } from 'react';
// import Button from "@material-ui/core/Button";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpnsionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import "./styles.css";

// import { Link } from "react-router-dom";
// import Collapsible from './Collapsible';

class FAQs extends Component {
  state = {}

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }

    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(e) {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <div>
        <h1>FAQs</h1>

        {/*
      <Collapsible trigger="What should I do if I have had close contact with someone who has COVID-19?">
        <p>Be alert for symptoms. Watch for fever, cough, shortness of breath, or other symptoms of COVID-19. Take your temperature and follow CDC guidance if you have symptoms.</p>
      </Collapsible>

      <Collapsible trigger="Who is considered a close contact to someone with COVID-19??">
        <p>For COVID-19, a close contact is defined as anyone who was within 6 feet of an infected person for at least 15 minutes starting from 48 hours before the person began feeling sick until the time the patient was isolated.</p>
      </Collapsible>
      

        <div onClick={(e) => this.togglePanel(e)} className='collapsible__header'>
          <p> What should I do if I have had close contact with someone who has COVID-19? </p>
        </div>

        {this.state.open ? (
          <div className='collapsible__inner'>
            <p>Be alert for symptoms. Watch for fever, cough, shortness of breath, or other symptoms of COVID-19. Take your temperature and follow CDC guidance if you have symptoms.</p>
          </div>
        ) : null}

        */}

        <ExpansionPanel>
          <ExpnsionPanelSummary expandIcon={<ExpandMoreIcon />}>
            {<p>When should I visit an assessment centre?</p>}
          </ExpnsionPanelSummary>
          <ExpansionPanelDetails>
            <div>{<p>Even if you don't show symptoms, if you feel you have been exposed to COVID-19, you should get tested. </p>}</div>
          </ExpansionPanelDetails>
        </ExpansionPanel>


      </div>
    );
  }
}

export default FAQs;