import React from 'react';
import { uid } from 'react-uid';

import Centre from './Centre';

function CentreList(props) {
  return (
    props.centres.map(centre => (
      <Centre key={uid(centre)} centre={centre}
        addAppt={appt => props.addAppt(appt)}
        formattedDate={props.formattedDate}
        day={props.day}
        isLoggedIn={props.isLoggedIn} />
    ))
  )
}

export default CentreList;