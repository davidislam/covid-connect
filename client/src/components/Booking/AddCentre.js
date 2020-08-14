import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { uid } from "react-uid";
import CustomizedSnackbar from './../CustomizedSnackbar';
import { createCentre } from './../../actions/centre';
import { handleChange, toggle } from './../../utils';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// Geocoding library
import Geocode from 'react-geocode';
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setRegion('ca');
Geocode.enableDebug();


const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];


export default class AddCentre extends Component {
  initState = {
    open: false,
    name: "",
    city: "",
    address: "",
    postalCode: "",
    number: "",
    url: "",
    startTime: "",
    startMeridiem: "",
    endTime: "",
    endMeridiem: "",
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    snackbarMessage: "",
    snackbarSeverity: "",
    snackbarOpen: false,
  };

  state = {
    open: false,
    name: "",
    city: "",
    address: "",
    postalCode: "",
    number: "",
    url: "",
    startTime: "",
    startMeridiem: "",
    endTime: "",
    endMeridiem: "",
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    snackbarMessage: "",
    snackbarSeverity: "",
    snackbarOpen: false,
  };

  componentDidMount() {
    this.hours = {
      monday: [], tuesday: [], wednesday: [], thursday: [], friday: [],
      saturday: [], sunday: []
    };
  }

  addTimeslot = () => {
    const { startTime, startMeridiem, endTime, endMeridiem } = this.state;
    if (startTime === "" || startMeridiem === "" || endTime === "" || endMeridiem === "") {
      this.setState({ snackbarOpen: true, snackbarMessage: "Please choose a time", snackbarSeverity: "warning" })
      return;
    }

    // At least one day must be selected
    let daySelected = false;
    for (let i = 0; i < days.length; i++) {
      if (this.state[days[i]]) {
        daySelected = true;
        break;
      }
    }
    if (!daySelected) {
      this.setState({ snackbarOpen: true, snackbarMessage: "Please choose a day", snackbarSeverity: "warning" });
      return;
    }

    const formattedTime = `${startTime} - ${endTime} ${endMeridiem}`;
    const timeslot = { time: formattedTime, isTaken: false };

    // Add <timeslot> to checked days
    days.forEach(day => {
      if (this.state[day]) {
        this.hours[day].push(timeslot);
      }
    })

    // console.log(this.hours);

    this.setState({
      startTime: '', startMeridiem: '', endTime: '', endMeridiem: '',
      snackbarOpen: true, snackbarMessage: "Timeslot added", snackbarSeverity: 'info',
      monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, city, postalCode, number, url } = this.state;

    // At least one timeslot must be added
    let addedTimeslot = false;
    for (let i = 0; i < days.length; i++) {
      if (this.hours[days[i]].length !== 0) {
        addedTimeslot = true;
        break;
      }
    }
    if (!addedTimeslot) {
      this.setState({ snackbarOpen: true, snackbarMessage: "Please add a timeslot", snackbarSeverity: "warning" });
      return;
    }

    const addr = `${address}, ${city}, Ontario, Canada ${postalCode}`;
    Geocode.fromAddress(addr).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        // console.log(lat, lng);
        const location = { address, city, postalCode, latitude: lat, longitude: lng };
        const newCentre = { name, location, phoneNumber: number, url, hours: this.hours };
        createCentre(this, newCentre);
      },
      error => {
        console.error(error);
        this.setState({ snackbarOpen: true, snackbarMessage: "Incomplete address", snackbarSeverity: "warning" });
      }
    );

  };

  populateTime = () => {
    let timeArr = [];
    for (let i = 1; i < 13; i++) {
      const time = `${i}:00`;
      timeArr.push(time);
    }
    return timeArr;
  }

  // toggleSnackbar = () => {
  //   this.setState(state => ({ snackbarOpen: !state.snackbarOpen }))
  // };

  render() {
    const {
      open,
      name,
      city,
      address,
      postalCode,
      number,
      url,
      startMeridiem,
      startTime,
      endTime,
      endMeridiem,
      snackbarMessage,
      snackbarOpen,
      snackbarSeverity
    } = this.state;
    const daysCapitalized = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    const requiredMsg = "this field is required";
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => toggle(this, "open")}
        >
          Add Assessment Centre
        </Button>
        <Dialog
          open={open}
          onClose={() => toggle(this, "open")}
          aria-labelledby="form-dialog-title"
        >
          <ValidatorForm onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Add Centre</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add an assessment centre to this website, please fill out the
                form below.
            </DialogContentText>
              <div style={inputStyle}>
                <TextValidator
                  label="Name"
                  name="name"
                  value={name}
                  onChange={e => handleChange(this, e)}
                  validators={['required', 'minStringLength:5']}
                  errorMessages={[requiredMsg, 'name must be at least five characters']}
                />
                <TextValidator
                  label="Address"
                  name="address"
                  value={address}
                  onChange={e => handleChange(this, e)}
                  validators={['required', 'minStringLength:5']}
                  errorMessages={[requiredMsg, 'address must be at least five characters']}
                />
                <TextValidator
                  label="Postal code"
                  name="postalCode"
                  value={postalCode}
                  onChange={e => handleChange(this, e)}
                  validators={['required', 'matchRegexp:^[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]$']}
                  errorMessages={[requiredMsg, 'invalid postal code']}
                />
                <TextValidator
                  label="City"
                  name="city"
                  value={city}
                  onChange={e => handleChange(this, e)}
                  validators={['required']}
                  errorMessages={[requiredMsg]}
                />
                <TextValidator
                  label="Phone number"
                  name="number"
                  value={number}
                  onChange={e => handleChange(this, e)}
                />
                <TextValidator
                  label="website url"
                  name="url"
                  type="url"
                  value={url}
                  onChange={e => handleChange(this, e)}
                />
              </div>
              <DialogContentText>
                Select the days of availability.
              </DialogContentText>
              <FormGroup row required>
                {daysCapitalized.map(day => (
                  <FormControlLabel key={uid(day)}
                    control={
                      <Checkbox name={day.toLowerCase()} checked={this.state[day.toLowerCase()]} color="primary" onChange={() => toggle(this, day.toLowerCase())} />
                    }
                    label={day}
                  />
                ))}
              </FormGroup>
              <DialogContentText>
                Choose the times for the selected days.
              </DialogContentText>

              <div style={timeStyles}>
                <FormControl >
                  <InputLabel>From</InputLabel>
                  <Select value={startTime} name="startTime" onChange={(e) => handleChange(this, e)} style={{ width: '10ch' }}>
                    {this.populateTime().map(time =>
                      <MenuItem key={uid(time)} value={time}>{time}</MenuItem>)}
                  </Select>
                </FormControl>

                <FormControl >
                  <Select value={startMeridiem} name="startMeridiem" onChange={(e) => handleChange(this, e)} style={{ width: '10ch' }}>
                    <MenuItem value='AM'>AM</MenuItem>
                    <MenuItem value='PM'>PM</MenuItem>
                  </Select>
                </FormControl>

                <FormControl >
                  <InputLabel>To</InputLabel>
                  <Select value={endTime} name="endTime" onChange={(e) => handleChange(this, e)} style={{ width: '10ch' }}>
                    {this.populateTime().map(time =>
                      <MenuItem key={uid(time)} value={time}>{time}</MenuItem>)}
                  </Select>
                </FormControl>

                <FormControl >
                  <Select value={endMeridiem} name="endMeridiem" onChange={(e) => handleChange(this, e)} style={{ width: '10ch' }}>
                    <MenuItem value='AM'>AM</MenuItem>
                    <MenuItem value='PM'>PM</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Button color="secondary" onClick={this.addTimeslot} style={btnStyle}>
                Add timeslot
              </Button>

            </DialogContent>
            <DialogActions>
              <Button onClick={() => toggle(this, "open")} color="primary">
                Cancel
            </Button>
              <Button type="submit" color="primary">
                Submit
            </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
        <CustomizedSnackbar
          message={snackbarMessage}
          severity={snackbarSeverity}
          open={snackbarOpen}
          toggleSnackbar={() => toggle(this, "snackbarOpen")}
        />
      </div>
    );
  }
}

const inputStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-evenly",
  marginBottom: "30px"
};

const timeStyles = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-evenly",
  alignItems: "baseline",
  marginBottom: "10px"
};

const btnStyle = {
  marginLeft: '40%',
}