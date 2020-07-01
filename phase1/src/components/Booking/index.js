import React from 'react';
import BookingInfo from './BookingInfo';

import './styles.css';

export default function Booking(props) {
  let element;
  if (props.isLoggedIn) {
    element = <BookingInfo username={props.username} />
  } else {
    element = <h3>You must be logged in to use this feature</h3>
  }

  return element;
}
