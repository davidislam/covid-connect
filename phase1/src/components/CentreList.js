import React from 'react';
import { uid } from 'react-uid';

import Centre from './Centre';

function CentreList(props) {
  return (
    props.centres.map(centre => (
      <Centre key={uid(centre)} centre={centre} />
    ))
  )
}

export default CentreList;