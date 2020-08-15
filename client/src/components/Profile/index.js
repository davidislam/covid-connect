import React, { useState, useEffect } from 'react';
import ProfileView from './ProfileView';
import ApptTable from './ApptTable';
import Typography from '@material-ui/core/Typography';
import { updateProfileForCurrentUser, getProfileForCurrentUser } from '../../actions/user';


function Profile(props) {

  useEffect(() => {
    getProfileForCurrentUser(setInfo);
  }, [])

  const [info, setInfo] = useState({
    username: '',
    email: '',
    name: '',
    age: null,
    healthCardNumber: '',
    phoneNumber: '',
    address: ''
  });

  const [changeState, setChangeState] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (prop) => (event) => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateProfileForCurrentUser(info, props.app, setOpen);
    setTimeout(() => {
      setChangeState(!changeState);
    }, 1000)
  }

  const handleClick = () => {
    setChangeState(!changeState);
  }

  let element = <ProfileView
    username={info.username}
    email={info.email}
    name={info.name}
    age={info.age}
    healthCardNumber={info.healthCardNumber}
    phoneNumber={info.phoneNumber}
    address={info.address}
    changeInfo={handleChange}
    handleSubmit={handleSubmit}
    handleClick={handleClick}
    open={open}
    setOpen={setOpen}
    changeState={changeState}
  />

  if (props.isAdmin) {
    return element;
  } else {
    return (
      <React.Fragment>
        {element}
        <Typography variant="h4" className='apptsLabel'> Scheduled Appointments </Typography>
        <ApptTable />
      </React.Fragment>
    )
  }
}

export default Profile;
