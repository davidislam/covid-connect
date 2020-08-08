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
import { v4 as uuidv4 } from 'uuid';
import CustomizedSnackbar from './../CustomizedSnackbar';
import CustomizedSelect from './../CustomizedSelect';
import { modifyCentre, getCentreByName } from './../../actions/centre';
import { CENTRES } from './../../data';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// Geocoding library
import Geocode from 'react-geocode';
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setRegion('ca');
Geocode.enableDebug();


const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const daysCapitalized = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];


export default class ModifyCentre extends Component {
  initState = {
    centreName: '',
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
    snackbarMessage: "",
    snackbarSeverity: "",
    snackbarOpen: false,
    visibility: 'hidden',
  };

  submitState = {
    centreName: "",
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
    snackbarMessage: "Assessment centre modified",
    snackbarSeverity: "success",
    snackbarOpen: true,
    visibility: 'hidden',
    timeslotId: '',
    timeslotDay: '',
  };

  state = {
    centreName: "",
    centreID: '',
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
    snackbarMessage: "",
    snackbarSeverity: "",
    snackbarOpen: false,
    visibility: "hidden",
    // timeslot: '',
    timeslotId: '',
    timeslotDay: '',
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

  handleSelectChange = e => {
    const value = e.target.value;
    const centre = getCentreByName(value);
    const { _id, name, location, phoneNumber, url, hours } = centre;
    const { city, address, postalCode } = location;
    // console.log(centre);
    this.hours = hours;
    this.days = {
      monday: false, tuesday: false, wednesday: false, thursday: false, friday: false,
      saturday: false, sunday: false
    };
    this.setState({
      centreName: value,
      centreID: _id,
      name,
      city,
      address,
      postalCode,
      number: phoneNumber,
      url,
      visibility: 'visible',
      timeslotId: '',
      timeslotDay: ''
    })
    // console.log(hours);

    // console.log(this.hours);
  }

  /* When a timeslot is selected, update id*/
  handleDelTimeslotChange = (event, child) => {
    const name = event.target.name; // timeslotId
    const value = event.target.value; // id of menuitem
    // const id = child.props.id;
    const day = child.props.day;
    // console.log(event);
    // console.log(event.target);
    // console.log(child);
    // console.log(child.props);
    this.setState({ [name]: value, timeslotDay: day });
  }

  /* Returns a list of Material UI MenuItems */
  showTimeslots() {
    const rs = [];
    // console.log(this.hours);
    // Ensure <hours> is defined
    const hours = {
      monday: [], tuesday: [], wednesday: [], thursday: [], friday: [],
      saturday: [], sunday: []
    };
    this.hours = this.hours === undefined ? hours : this.hours;
    // console.log(this.hours);
    daysCapitalized.forEach(day => {
      const dayLower = day.toLowerCase();
      // console.log(dayLower);
      // console.log(this.hours);
      if (this.hours[dayLower].length !== 0) {
        // Add each timeslot for that day
        this.hours[dayLower].forEach(ts => {
          const booked = ts.isTaken ? 'booked' : 'not booked';
          const title = `${day} ${ts.time}, ${booked}`;
          const e = <MenuItem key={ts._id} value={ts._id} day={dayLower}>{title}</MenuItem>;
          rs.push(e);
        })
      }
    })

    return rs;
  }

  deleteTimeslot = () => {
    const { timeslotDay, timeslotId } = this.state;
    if (timeslotDay === '' || timeslotId === '') {
      this.setState({ snackbarOpen: true, snackbarMessage: "Please choose a time to delete", snackbarSeverity: "warning" })
      return;
    }
    // Server call required
    this.hours[timeslotDay] = this.hours[timeslotDay].filter(ts => ts._id !== timeslotId);
    this.setState({ timeslotId: '', timeslotDay: '', snackbarOpen: true, snackbarMessage: "Timeslot removed", snackbarSeverity: "success" })
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
    // this.render();
  }

  /* Add timeslot */
  handleClick = () => {
    const { startTime, startMeridiem, endTime, endMeridiem } = this.state;
    if (startTime === "" || startMeridiem === "" || endTime === "" || endMeridiem === "") {
      this.setState({ snackbarOpen: true, snackbarMessage: "Please choose a time", snackbarSeverity: "warning" })
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

    const formattedTime = `${startTime} - ${endTime} ${endMeridiem}`;
    const timeslot = { _id: uuidv4(), time: formattedTime, isTaken: false };

    // Add <timeslot> to checked days
    // Server call required
    days.forEach(day => {
      if (this.days[day]) {
        this.hours[day].push(timeslot);
      }
    })
    this.days = {
      monday: false, tuesday: false, wednesday: false, thursday: false, friday: false,
      saturday: false, sunday: false
    };
    this.setState({
      startTime: '', startMeridiem: '', endTime: '', endMeridiem: '',
      snackbarOpen: true, snackbarMessage: "Timeslot added", snackbarSeverity: 'info'
    });

  }

  handleSubmit = (e) => {
    const { address, city, postalCode } = this.state;
    e.preventDefault();

    // if (centreID === '') {
    //   this.setState({ snackbarOpen: true, snackbarMessage: "Please select a centre to modify", snackbarSeverity: "warning" });
    //   return;
    // }

    const addr = `${address}, ${city}, Ontario, Canada ${postalCode}`;
    Geocode.fromAddress(addr).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        // console.log(lat, lng);
        modifyCentre(this.state, this.hours, lat, lng);
        this.setState(this.submitState);
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

  toggleSnackbar = () => {
    this.setState(state => ({ snackbarOpen: !state.snackbarOpen }))
  };

  render() {
    // this.days = this.days === undefined ? {
    //   monday: false, tuesday: false, wednesday: false, thursday: false, friday: false,
    //   saturday: false, sunday: false
    // } : this.days;
    // console.log(this.days);
    const {
      centreName,
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
      snackbarSeverity,
      visibility,
      timeslotId
    } = this.state;
    const requiredMsg = "this field is required";
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Modify Assessment Centre
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <ValidatorForm onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Modify Centre</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please choose an assessment centre and modify any details below.
              </DialogContentText>
              <CustomizedSelect
                label="Centre"
                value={centreName}
                name="centreName"
                onChange={(e) => this.handleSelectChange(e)}
                w="20ch"
                arr={CENTRES.map((centre) => {
                  return centre.name
                })}
              />
              <div style={{ visibility }}>


                <div style={inputStyle}>
                  <TextValidator
                    label='Name'
                    name="name"
                    value={name}
                    onChange={this.handleInputChange}
                    validators={['required', 'minStringLength:5']}
                    errorMessages={[requiredMsg, 'name must be at least five characters']}
                  />
                  <TextValidator
                    label='Address'
                    name="address"
                    value={address}
                    onChange={this.handleInputChange}
                    validators={['required', 'minStringLength:5']}
                    errorMessages={[requiredMsg, 'address must be at least five characters']}
                  />
                  <TextValidator
                    label='Postal code'
                    name="postalCode"
                    value={postalCode}
                    onChange={this.handleInputChange}
                    validators={['required', 'matchRegexp:^[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]$']}
                    errorMessages={[requiredMsg, 'invalid postal code']}
                  />
                  <TextValidator
                    label='City'
                    name="city"
                    value={city}
                    onChange={this.handleInputChange}
                    validators={['required']}
                    errorMessages={[requiredMsg]}
                  />
                  <TextValidator
                    label='Phone Number'
                    name="number"
                    value={number}
                    onChange={this.handleInputChange}
                  />
                  <TextValidator
                    label='Website url'
                    name="url"
                    type="url"
                    value={url}
                    onChange={this.handleInputChange}
                  />
                </div>
                <DialogContentText>
                  Add appointment times by selecting days and adding timeslots
                </DialogContentText>
                <FormGroup row >
                  {daysCapitalized.map(day => (
                    <FormControlLabel key={uid(day)}
                      control={
                        <Checkbox name={day.toLowerCase()} color="primary" onChange={this.handleCheckboxChange} />
                      }
                      label={day}
                    />
                  ))}
                </FormGroup>
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

                <DialogContentText>
                  Remove a timeslot
                </DialogContentText>

                <FormControl >
                  <InputLabel>Choose time</InputLabel>
                  <Select value={timeslotId} name='timeslotId' onChange={this.handleDelTimeslotChange} style={{ width: '40ch' }}>
                    {this.showTimeslots()}
                  </Select>
                </FormControl>

                <div>
                  <Button color="secondary" onClick={this.deleteTimeslot}>
                    Delete timeslot
                </Button>
                </div>


              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>
              <Button type="submit" color="primary">
                Modify
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
  marginBottom: "30px",
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
