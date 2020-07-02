import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import { Drawer } from '@material-ui/core';
//import Button from "@material-ui/core/Button";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import "./styles.css";

class FAQs extends Component {

  render() {
    return (
      <div>

        <h1>Frequently Asked Questions</h1>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="expansion__header">
            {<p>When should I visit an assessment centre?</p>}
          </AccordionSummary>
          <AccordionDetails>
            {<div>
              <p>Even if you don't show <a href="https://www.ontario.ca/page/covid-19-stop-spread#section-0">symptoms</a>, you should get tested if you feel you may have been exposed to COVID-19. </p>
              <p>You should visit an assessment centre if you:</p>
              <ul>
                <li>Have symptoms</li>
                <li>Don't have symptoms but may have been exposed</li>
                <li>Don't have symptoms but may be at risk</li>
              </ul>
            </div>}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="expansion__header">
            {<p>Who can visit an assessment centre?</p>}
          </AccordionSummary>
          <AccordionDetails>
            {<p>Anyone can be tested. Testing is a free service. If possible, bring your Ontario health card to the appointent. <strong className='links'><Link to="/booking">Find a centre now.</Link></strong></p>}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="expansion__header">
            {<p>How should I prepare for testing?</p>}
          </AccordionSummary>
          <AccordionDetails>
            {<p>If possible, bring your Ontario health card and a pen with you to be tested. Call the assessment centre if you have any additional questions or concerns.</p>}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="expansion__header">
            {<p>What should I expect during testing?</p>}
          </AccordionSummary>
          <AccordionDetails>
            {<p>The health care practitioner will take a swab of your nasal passages. Expect some temporary discomfort. </p>}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} className="expansion__header">
            {<p>How can I get my results?</p>}
          </AccordionSummary>
          <AccordionDetails>
            {<p>After you have been tested, you can <a href="https://covid19results.ehealthontario.ca:4443/agree">get your results</a> online. If you have trouble accessing the internet, contact your assessment centre. </p>}
          </AccordionDetails>
        </Accordion>

      </div>
    );
  }
}

export default FAQs;