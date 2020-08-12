import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';

export default function Address(props) {
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
