import React from 'react';
import User from './User';
import Admin from './Admin';


function Profile(props) {
  let element;
  if (props.isAdmin) {
    element = <Admin username={props.username} />
  } else {
    element = <User username={props.username} />
  }

  return element;
}

export default Profile;