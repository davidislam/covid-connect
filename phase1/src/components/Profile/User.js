import React, {useState } from 'react';
import ApptTable from './ApptTable';
import {Divider,Grid,TextField,Button,Typography} from "@material-ui/core"



export default function UserProfileComponent(props){

  const [changeState,setChangeState] = useState(false);


  const handleClick = () => {
    setChangeState(!changeState);
  }

  return(
    <div>
      <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h4">User Info: </Typography>
        </Grid>

        {!changeState?(
          <div>
          <Grid item>
            <Button variant="contained"
            color="default"
            onClick={handleClick}>
            Click to change information
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="h6">User Name: {props.username}</Typography>
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
            <Typography variant="h6">health Card Number: {props.healthCardNum}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6">Phone Number: {props.phoneNumber}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6">Address: {props.address}</Typography>
          </Grid>
          </div>):
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
              disabled
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
                  value={props.healthCardNum}
                  onChange={props.changeInfo('address')}
                  />
                  </Grid>
          </div>

        }

        <Divider />
        <Grid item>
          <Typography variant="h3">appointments</Typography>
          </Grid>
        <Grid item>
          <ApptTable appointments={props.appointments} deleteAppt={appt => this.props.deleteAppt(appt)} />
        </Grid>
      </Grid>
    </div>
  )

}
