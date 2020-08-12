import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';

export default function Number(props) {
  return (
    <div>
      <h4> <PhoneIcon color='primary' fontSize='small' className='icon' /> Phone Number</h4>
      <p>{props.phone}</p>
    </div>
  )
}
