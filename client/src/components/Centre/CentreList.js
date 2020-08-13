import React from 'react';
import Centre from './Centre';

function CentreList(props) {
  return (
    props.centres.map(centre => (
      <Centre
        key={centre._id}
        centre={centre}
        addAppt={appt => props.addAppt(appt)}
        formattedDate={props.formattedDate}
        day={props.day}
        isLoggedIn={props.isLoggedIn} />
    ))
  )
}

export default CentreList;