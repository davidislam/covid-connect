import React from 'react';
import { Grid, Button, Typography } from "@material-ui/core"
import CustomizedSnackbar from './../CustomizedSnackbar';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


export default function ProfileView(props) {
  const requiredMsg = 'this field is required';
  return (
    <React.Fragment>
      <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h4">{props.username} Info: </Typography>
        </Grid>

        {!props.changeState ? (
          <div>
            <Grid item>
              <Button variant="contained"
                color="default"
                onClick={props.handleClick}>
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
              <Typography variant="h6">Health Card Number: {props.healthCardNumber}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h6">Phone Number: {props.phoneNumber}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="h6">Address: {props.address}</Typography>
            </Grid>
          </div>) :

          <ValidatorForm onSubmit={props.handleSubmit}>

            <Grid item>
              <Button variant="contained"
                color="primary"
                type="submit"
              >
                Click to save your changes
              </Button>
            </Grid>

            <Grid item>
              <TextValidator
                id="username"
                label="Username"
                value={props.username}
                onChange={props.changeInfo('username')}
                validators={['required', 'minStringLength:4']}
                errorMessages={[{ requiredMsg }, 'your username must be at least 4 characters long']}
              />
            </Grid>

            <Grid item>
              <TextValidator
                id="email"
                label="Email"
                value={props.email}
                onChange={props.changeInfo('email')}
                validators={['required', 'isEmail']}
                errorMessages={[{ requiredMsg }, 'invalid email']}
              />
            </Grid>

            <Grid item>
              <TextValidator
                id="name"
                label="Name"
                value={props.name}
                onChange={props.changeInfo('name')}
                validators={['required', 'minStringLength:3']}
                errorMessages={[{ requiredMsg }, 'your name must be at least 3 characters long']}
              />
            </Grid>

            <Grid>
              <TextValidator
                id="age"
                label="Age"
                value={props.age}
                onChange={props.changeInfo('age')}
                validators={['required', 'isNumber']}
                errorMessages={[{ requiredMsg }, 'invalid age']}
              />
            </Grid>

            <Grid>
              <TextValidator
                id="healthCardNum"
                label="Health Card Number"
                value={props.healthCardNum}
                onChange={props.changeInfo('healthCardNumber')}
              />
            </Grid>

            <Grid>
              <TextValidator
                id="phoneNumber"
                label="Phone Number"
                value={props.phoneNumber}
                onChange={props.changeInfo('phoneNumber')}
              />
            </Grid>

            <Grid>
              <TextValidator
                id="address"
                label="Address"
                value={props.address}
                onChange={props.changeInfo('address')}
                validators={['minStringLength:5']}
                errorMessages={['your address must be at least 5 characters long']}
              />
            </Grid>
          </ValidatorForm>
        }
      </Grid>
      <CustomizedSnackbar message='Profile successfully updated' severity='success' open={props.open} toggleSnackbar={() => props.setOpen(false)} />
    </React.Fragment>
  )

}
