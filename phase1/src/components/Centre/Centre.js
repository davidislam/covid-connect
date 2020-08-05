import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import LinkIcon from '@material-ui/icons/Link';

import HoursForm from './HoursForm';

function Address(props) {
  const { address, city, postalCode } = props.location;
  return (
    <div>
      <h4> <LocationOnIcon color='primary' fontSize='small' className='icon' /> Address</h4>
      <p>{address}</p>
      <p>{city}</p>
      <p>{postalCode}</p>
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
      <div id="url"> <a href={props.link}>{props.link}</a> </div>
    </div>
  )
}

function formattedAddress(location) {
  return `${location.address}, ${location.city}, ON ${location.postalCode}`
}

class Centre extends Component {
  state = {}
  render() {
    const { centre } = this.props;
    return (
      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {centre.name}
        </AccordionSummary>
        <AccordionDetails className='container'>
          <Address location={centre.location} className='item' />
          <Number phone={centre.phoneNumber} className='item' />
          <Url link={centre.url} className='item' />
          <HoursForm
            heading="Details"
            timeslots={centre.hours[this.props.day]}
            className='item'
            formattedDate={this.props.formattedDate}
            formattedAddress={formattedAddress(centre.location)}
            addAppt={appt => this.props.addAppt(appt)}
            isLoggedIn={this.props.isLoggedIn}
          />
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default Centre;