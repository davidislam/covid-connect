import React, { useState } from 'react';
import { Grid, TextField, Button, Typography } from "@material-ui/core"
import CustomizedSnackbar from './../CustomizedSnackbar';

/* A reusable profile view componenet */

export default function ProfileView(props) {

  const [changeState, setChangeState] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (changeState === true) {
      setOpen(true);
    }
    setChangeState(!changeState);
  }

  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h4">{props.username} Info: </Typography>
        </Grid>

        {!changeState ? (
          <div>
            <Grid item>
              <Button variant="contained"
                color="default"
                onClick={handleClick}>
                Click to change profile information
            </Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">Username: {props.username}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h6">Email: {props.email}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h6">Name: {props.name}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h6">Age: {props.age}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h6">Health Card number: {props.healthCardNum}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h6">Phone Number: {props.phoneNumber}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h6">Address: {props.address}</Typography>
            </Grid>
          </div>) :
          <div>

            <Grid item>
              <Button variant="contained"
                color="primary"
                onClick={handleClick}>
                Click to save your change
              </Button>
            </Grid>

            <Grid item>
              <TextField
                id="username"
                label="Username"
                value={props.username}
                onChange={props.handleUsername}
              />
            </Grid>

            <Grid item>
              <TextField
                id="email"
                label="Email"
                value={props.email}
                onChange={props.changeInfo('email')}
              />
            </Grid>

            <Grid item>
              <TextField
                id="name"
                label="Name"
                value={props.name}
                onChange={props.changeInfo('name')}
              />
            </Grid>

            <Grid>
              <TextField
                id="age"
                label="Age"
                value={props.age}
                onChange={props.changeInfo('age')}
              />
            </Grid>

            <Grid>
              <TextField
                id="healthCardNum"
                label="Health Card Number"
                value={props.healthCardNum}
                onChange={props.changeInfo('healthCardNum')}
              />
            </Grid>

            <Grid>
              <TextField
                id="phoneNumber"
                label="Phone Number"
                value={props.phoneNumber}
                onChange={props.changeInfo('phoneNumber')}
              />
            </Grid>

            <Grid>
              <TextField
                id="address"
                label="Address"
                value={props.address}
                onChange={props.changeInfo('address')}
              />
            </Grid>
          </div>
        }
      </Grid>
      <CustomizedSnackbar message='Profile updated' severity='success' open={open} toggleSnackbar={() => setOpen(false)} />
    </div>
  )

}
