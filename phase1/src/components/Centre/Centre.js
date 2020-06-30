import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpnsionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import LinkIcon from '@material-ui/icons/Link';

import HoursForm from './HoursForm';

function Address(props) {
  const { address, city, postal_code } = props.location;
  return (
    <div>
      <h4> <LocationOnIcon color='primary' fontSize='small' className='icon' /> Address</h4>
      <p>{address}</p>
      <p>{city}</p>
      <p>{postal_code}</p>
    </div>
  )
}

function Number(props) {
  return (
    <div>
      <h4> <PhoneIcon color='primary' fontSize='small' className='icon' /> Phone Number</h4>
      <p>{props.phone}</p>
    </div>
  )
}

function Url(props) {
  return (
    <div>
      <h4> <LinkIcon color='primary' fontSize='small' className='icon' /> Website</h4>
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
        <ExpansionPanelDetails className='container'>
          <Address location={centre.location} className='item' />
          <Number phone={centre.number} className='item' />
          <Url link={centre.website} className='item' />
          <HoursForm heading="Details" timeslots={centre.hours} className='item' />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default Centre;