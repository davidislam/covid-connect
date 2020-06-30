import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpnsionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";

import HoursForm from './HoursForm';

function Address(props) {
  const { address, city, postal_code } = props.location;
  return (
    <div>
      <h4>Address</h4>
      <p>{address}</p>
      <p>{city}</p>
      <p>{postal_code}</p>
    </div>
  )
}

function Number(props) {
  return (
    <div>
      <h4>Phone Number</h4>
      <p>{props.phone}</p>
    </div>
  )
}

function Url(props) {
  return (
    <div>
      <h4>Website</h4>
      <a href={props.link}>{props.link}</a>
    </div>
  )
}

class Centre extends Component {
  state = {}
  render() {
    const { centre } = this.props;
    return (
      <ExpansionPanel className='panel'>
        <ExpnsionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {centre.name}
        </ExpnsionPanelSummary>
        <ExpansionPanelDetails>
          <Address location={centre.location} />
          <Number phone={centre.number} />
          <Url link={centre.website} />
          <HoursForm heading="Details" timeslots={centre.hours} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default Centre;