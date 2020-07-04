import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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


export default class AddCentre extends Component {
  initState = {
    open: false,
    name: "",
    city: "",
    address: "",
    postal_code: "",
    number: "",
    website: "",
    startTime: "",
    startMeridiem: "",
    endTime: "",
    endMeridiem: "",
    hours: [],
    snackbarMessage: "",
    snackbarSeverity: "",
    snackbarOpen: false,
  };

  submitState = {
    open: false,
    name: "",
    city: "",
    address: "",
    postal_code: "",
    number: "",
    website: "",
    startTime: "",
    startMeridiem: "",
    endTime: "",
    endMeridiem: "",
    hours: [],
    snackbarMessage: "Assessment centre added",
    snackbarSeverity: "success",
    snackbarOpen: true,
  };

  state = {
    open: false,
    name: "",
    city: "",
    address: "",
    postal_code: "",
    number: "",
    website: "",
    startTime: "",
    startMeridiem: "",
    endTime: "",
    endMeridiem: "",
    hours: [],
    snackbarMessage: "",
    snackbarSeverity: "",
    snackbarOpen: false,
  };

  componentDidMount() {
    this.days = {
      monday: false, tuesday: false, wednesday: false, thursday: false, friday: false,
      saturday: false, sunday: false
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
    if (target.checked) {
      this.days[target.name] = true;
    } else {
      this.days[target.name] = false;
    }
    // console.log(this.days);
  }

  handleClick = () => {
    const { startTime, startMeridiem, endTime, endMeridiem } = this.state;
    // TODO: Validate input
    const formattedTime = `${startTime} ${startMeridiem} - ${endTime} ${endMeridiem}`;
    const timeslot = { time: formattedTime, is_taken: false };
    this.setState({
      hours: [...this.state.hours, timeslot],
      startTime: '', startMeridiem: '', endTime: '', endMeridiem: '',
      snackbarOpen: true, snackbarMessage: "Timeslot added", snackbarSeverity: 'info'
    });
  }

  handleSubmit = () => {
    // TODO: Validate input
    // code below requires server call
    addCentre(this.state, this.days);
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
      postal_code,
      number,
      website,
      startMeridiem,
      startTime,
      endTime,
      endMeridiem,
      snackbarMessage,
      snackbarOpen,
      snackbarSeverity
    } = this.state;
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
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
          <DialogTitle id="form-dialog-title">Add Centre</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add an assessment centre to this website, please fill out the
              form below.
            </DialogContentText>
            <form>
              <div style={inputStyle}>
                <TextField
                  label="Name"
                  name="name"
                  value={name}
                  onChange={this.handleInputChange}
                  required
                />
                <TextField
                  label="Address"
                  name="address"
                  value={address}
                  onChange={this.handleInputChange}
                  required
                />
                <TextField
                  label="Postal code"
                  name="postal_code"
                  value={postal_code}
                  onChange={this.handleInputChange}
                  required
                />
                <CitySelect label='City' value={city} onChange={this.handleInputChange} cities={CITIES} />
                <TextField
                  label="Phone number"
                  name="number"
                  value={number}
                  onChange={this.handleInputChange}
                />
                <TextField
                  label="Website url"
                  name="website"
                  value={website}
                  onChange={this.handleInputChange}
                />
              </div>
              <DialogContentText>
                Select the days of availability.
              </DialogContentText>
              <FormGroup row required>
                {days.map(day => (
                  <FormControlLabel key={uid(day)}
                    control={
                      <Checkbox name={day.toLowerCase()} color="primary" onChange={this.handleCheckboxChange} />
                    }
                    label={day}
                  />
                ))}
              </FormGroup>
              <DialogContentText>
                Choose the times of availability.
              </DialogContentText>

              <div style={timeStyles}>
                <FormControl required>
                  <InputLabel>From</InputLabel>
                  <Select value={startTime} name="startTime" onChange={this.handleInputChange} style={{ width: '10ch' }}>
                    {this.populateTime().map(time =>
                      <MenuItem key={uid(time)} value={time}>{time}</MenuItem>)}
                  </Select>
                </FormControl>

                <FormControl required>
                  <Select value={startMeridiem} name="startMeridiem" onChange={this.handleInputChange} style={{ width: '10ch' }}>
                    <MenuItem value='AM'>AM</MenuItem>
                    <MenuItem value='PM'>PM</MenuItem>
                  </Select>
                </FormControl>

                <FormControl required>
                  <InputLabel>To</InputLabel>
                  <Select value={endTime} name="endTime" onChange={this.handleInputChange} style={{ width: '10ch' }}>
                    {this.populateTime().map(time =>
                      <MenuItem key={uid(time)} value={time}>{time}</MenuItem>)}
                  </Select>
                </FormControl>

                <FormControl required>
                  <Select value={endMeridiem} name="endMeridiem" onChange={this.handleInputChange} style={{ width: '10ch' }}>
                    <MenuItem value='AM'>AM</MenuItem>
                    <MenuItem value='PM'>PM</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Button color="secondary" onClick={this.handleClick} style={btnStyle}>
                Add timeslot
              </Button>

            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" >
              Submit
            </Button>
          </DialogActions>
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