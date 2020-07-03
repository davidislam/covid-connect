import React, {useState} from 'react';
import UserProfileComponent from './User';
import AdminProfileComponent from './Admin';


function Profile(props) {
  let element;
  // loding data from database
  const [info,setInfo] = useState({
    email: 'kkk@mail.com',
    name: 'Louis',
    age: 11,
    healthCardNum: '12345',
    phoneNumber: '6472823993',
    address: '5 Random Cres'

  });

  const handleChange = (prop) => (event) => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  if (props.isAdmin) {
    element = <AdminProfileComponent username={props.username} />
  } else {
    element = <UserProfileComponent username={props.username}
    appointments={props.appointments}
    deleteAppt={appt => props.deleteAppt(appt)}
    email={info.email}
    name={info.name}
    age={info.age}
    healthCardNum={info.healthCardNum}
    phoneNumber={info.phoneNumber}
    address={info.address}
    changeInfo={handleChange}/>
  }

  return element;
}

export default Profile;
