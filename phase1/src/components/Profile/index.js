import React, { useState } from 'react';
import ProfileView from './ProfileView';
import ApptTable from './ApptTable';
import Typography from '@material-ui/core/Typography';


function Profile(props) {

  const [info, setInfo] = useState({
    username: props.username,
    email: 'example@gmail.com',
    name: 'John Doe',
    age: 25,
    healthCardNum: '12345',
    phoneNumber: '6472823993',
    address: '5 Random Cres'
  });

  const handleChange = (prop) => (event) => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  const handleUsername = (e) => {
    const newUsername = e.target.value;
    props.changeUsername(newUsername);
  }

  let element = <ProfileView
    username={props.username}
    email={info.email}
    name={info.name}
    age={info.age}
    healthCardNum={info.healthCardNum}
    phoneNumber={info.phoneNumber}
    address={info.address}
    changeInfo={handleChange}
    handleUsername={handleUsername}
  />

  if (props.isAdmin) {
    return element;
  } else {
    return (
      <div>
        {element}
        <Typography variant="h4" className='apptsLabel'> Scheduled Appointments </Typography>
        <ApptTable appointments={props.appointments} deleteAppt={appt => props.deleteAppt(appt)} />
      </div>
    )
  }
}

export default Profile;
