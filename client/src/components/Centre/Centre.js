import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HoursForm from './HoursForm';
import Address from './Address';
import Number from './Number';
import Url from './Url';
import { formattedAddress } from './../../actions/centre';


class Centre extends Component {
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
            cid={centre._id}
            day={this.props.day}
          />
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default Centre;