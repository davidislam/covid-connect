import React from 'react';
import BookingInfo from './BookingInfo';
import AdminView from './AdminView';

import './styles.css';

export default function Booking(props) {
  let element;
  if (props.isAdmin) {
    element = <AdminView username={props.username} />
  } else {
    element = <BookingInfo username={props.username} isLoggedIn={props.isLoggedIn} />
  }

  return element;
}
