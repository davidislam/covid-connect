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
import CitySelect from './CitySelect';
import { CITIES } from '../../data';
import { uid } from "react-uid";
import CustomizedSnackbar from './../CustomizedSnackbar';
import { addCentre } from './../../actions/centre';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
    // days: [
    //   {name: 'monday', isChecked: false},
    //   {name: 'tuesday', isChecked: false},
    //   {name: 'wednesday', isChecked: false},
    //   {name: 'thursday', isChecked: false},
    //   {name: 'friday', isChecked: false},
    //   {name: 'saturday', isChecked: false},
    //   {name: 'sunday', isChecked: false}
    // ],
    snackbarMessage: "",
    snackbarSeverity: "",
    snackbarOpen: false,
  };

  submitState = {
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
    // days: [
    //   {name: 'monday', isChecked: false},
    //   {name: 'tuesday', isChecked: false},
    //   {name: 'wednesday', isChecked: false},
    //   {name: 'thursday', isChecked: false},
    //   {name: 'friday', isChecked: false},
    //   {name: 'saturday', isChecked: false},
    //   {name: 'sunday', isChecked: false}
    // ],
    snackbarMessage: "Assessment centre added",
    snackbarSeverity: "success",
    snackbarOpen: true,
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
    // days: [
    //   {name: 'monday', isChecked: false},
    //   {name: 'tuesday', isChecked: false},
    //   {name: 'wednesday', isChecked: false},
    //   {name: 'thursday', isChecked: false},
    //   {name: 'friday', isChecked: false},
    //   {name: 'saturday', isChecked: false},
    //   {name: 'sunday', isChecked: false}
    // ],
    snackbarMessage: "",
    snackbarSeverity: "",
    snackbarOpen: false,
  };

  componentDidMount() {
    this.days = {
      monday: false, tuesday: false, wednesday: false, thursday: false, friday: false,
      saturday: false, sunday: false
    }; // Used for checkboxes
    this.hours = {
      monday: [], tuesday: [], wednesday: [], thursday: [], friday: [],
      saturday: [], sunday: []
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleCheckboxChange = e => {
    const target = e.target;
    this.days[target.name] = !this.days[target.name];
  }

  /* Add timeslot */
  handleClick = () => {
    const { startTime, startMeridiem, endTime, endMeridiem } = this.state;
    if (startTime === "" || startMeridiem === "" || endTime === "" || endMeridiem === "") {
      this.setState({ snackbarOpen: true, snackbarMessage: "Please choose a time", snackbarSeverity: "warning" })
      return;
    }
    // const formattedTime = `${startTime} ${startMeridiem} - ${endTime} ${endMeridiem}`;
    const formattedTime = `${startTime} - ${endTime} ${endMeridiem}`;
    const timeslot = { time: formattedTime, isTaken: false };

    // Add <timeslot> to checked days
    days.forEach(day => {
      if (this.days[day]) {
        this.hours[day].push(timeslot);
      }
    })

    this.setState({
      startTime: '', startMeridiem: '', endTime: '', endMeridiem: '',
      snackbarOpen: true, snackbarMessage: "Timeslot added", snackbarSeverity: 'info'
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.city === "") {
      this.setState({ snackbarOpen: true, snackbarMessage: "Please select a city", snackbarSeverity: "warning" });
      return;
    }

    // At least one day must be selected
    let daySelected = false;
    for (let i = 0; i < days.length; i++) {
      if (this.days[days[i]]) {
        daySelected = true;
        break;
      }
    }
    if (!daySelected) {
      this.setState({ snackbarOpen: true, snackbarMessage: "Please choose a day", snackbarSeverity: "warning" });
      return;
    }

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

    // code below requires server call
    addCentre(this.state, this.hours);
    this.setState(this.submitState);
  };

  populateTime = () => {
    let timeArr = [];
    for (let i = 1; i < 13; i++) {
      const time = `${i}:00`;
      timeArr.push(time);
    }
    return timeArr;
  }

  toggleSnackbar = () => {
    this.setState(state => ({ snackbarOpen: !state.snackbarOpen }))
  };

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
          onClick={this.handleClickOpen}
        >
          Add Assessment Centre
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
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
                  onChange={this.handleInputChange}
                  validators={['required', 'minStringLength:5']}
                  errorMessages={[requiredMsg, 'name must be at least five characters']}
                />
                <TextValidator
                  label="Address"
                  name="address"
                  value={address}
                  onChange={this.handleInputChange}
                  validators={['required', 'minStringLength:5']}
                  errorMessages={[requiredMsg, 'address must be at least five characters']}
                />
                <TextValidator
                  label="Postal code"
                  name="postalCode"
                  value={postalCode}
                  onChange={this.handleInputChange}
                  validators={['required', 'matchRegexp:^[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]$']}
                  errorMessages={[requiredMsg, 'invalid postal code']}
                />
                <CitySelect label='City' value={city} onChange={this.handleInputChange} cities={CITIES} />
                <TextValidator
                  label="Phone number"
                  name="number"
                  value={number}
                  onChange={this.handleInputChange}
                />
                <TextValidator
                  label="website url"
                  name="url"
                  type="url"
                  value={url}
                  onChange={this.handleInputChange}
                />
              </div>
              <DialogContentText>
                Select the days of availability.
              </DialogContentText>
              <FormGroup row required>
                {daysCapitalized.map(day => (
                  <FormControlLabel key={uid(day)}
                    control={
                      <Checkbox name={day.toLowerCase()} color="primary" onChange={this.handleCheckboxChange} />
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
                  <Select value={startTime} name="startTime" onChange={this.handleInputChange} style={{ width: '10ch' }}>
                    {this.populateTime().map(time =>
                      <MenuItem key={uid(time)} value={time}>{time}</MenuItem>)}
                  </Select>
                </FormControl>

                <FormControl >
                  <Select value={startMeridiem} name="startMeridiem" onChange={this.handleInputChange} style={{ width: '10ch' }}>
                    <MenuItem value='AM'>AM</MenuItem>
                    <MenuItem value='PM'>PM</MenuItem>
                  </Select>
                </FormControl>

                <FormControl >
                  <InputLabel>To</InputLabel>
                  <Select value={endTime} name="endTime" onChange={this.handleInputChange} style={{ width: '10ch' }}>
                    {this.populateTime().map(time =>
                      <MenuItem key={uid(time)} value={time}>{time}</MenuItem>)}
                  </Select>
                </FormControl>

                <FormControl >
                  <Select value={endMeridiem} name="endMeridiem" onChange={this.handleInputChange} style={{ width: '10ch' }}>
                    <MenuItem value='AM'>AM</MenuItem>
                    <MenuItem value='PM'>PM</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Button color="secondary" onClick={this.handleClick} style={btnStyle}>
                Add timeslot
              </Button>

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
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
          toggleSnackbar={this.toggleSnackbar}
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