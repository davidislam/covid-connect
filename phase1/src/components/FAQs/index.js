import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpnsionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import "./styles.css";

class FAQs extends Component {
  state = {}

  render() {
    return (
      <div>
        <h1>Frequently Asked Questions</h1>

        <ExpansionPanel>
          <ExpnsionPanelSummary expandIcon={<ExpandMoreIcon />} className="expansion__header">
            {<p>When should I visit an assessment centre?</p>}
          </ExpnsionPanelSummary>
          <ExpansionPanelDetails>
            {<div>
              <p>Even if you don't show <a href="https://www.ontario.ca/page/covid-19-stop-spread#section-0">symptoms</a>, if you feel you have been exposed to COVID-19, you should get tested. </p>
              <p>You should visit an assessment centre if you:</p>
                <ul>
                  <li>Have symptoms</li>
                  <li>Don't have symptoms but may have been exposed</li>
                  <li>Don't have symptoms but may be at risk</li>
                </ul>
            </div>}
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpnsionPanelSummary expandIcon={<ExpandMoreIcon />} className="expansion__header">
            {<p>Who can visit an assessment centre?</p>}
          </ExpnsionPanelSummary>
          <ExpansionPanelDetails>
            {<p>Anyone can be tested. Testing is a free service. If possible, bring your Ontario health card to the appointent. <strong className='links'><Link to="/booking">Find a centre now.</Link></strong></p>}
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpnsionPanelSummary expandIcon={<ExpandMoreIcon />} className="expansion__header">
            {<p>How should I prepare for testing?</p>}
          </ExpnsionPanelSummary>
          <ExpansionPanelDetails>
            {<p>If possible, bring your Ontario health card and a pen with you to be tested. Call the assessment centre if you have any additional questions or concerns.</p>}
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpnsionPanelSummary expandIcon={<ExpandMoreIcon />} className="expansion__header">
            {<p>What should I expect during testing?</p>}
          </ExpnsionPanelSummary>
          <ExpansionPanelDetails>
            {<p>The health care practitioner will take a swab of your nasal passages. Expect some temporary discomfort. </p>}
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpnsionPanelSummary expandIcon={<ExpandMoreIcon />} className="expansion__header">
            {<p>How can I get my results?</p>}
          </ExpnsionPanelSummary>
          <ExpansionPanelDetails>
            {<p>After you have been tested, you can <a href="https://covid19results.ehealthontario.ca:4443/agree">get your results</a> online. If you have trouble accessing the internet, contact your assessment centre. </p>}
          </ExpansionPanelDetails>
        </ExpansionPanel>


      </div>
    );
  }
}

export default FAQs;