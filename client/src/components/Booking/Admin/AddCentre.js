import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CustomizedSnackbar from '../../CustomizedSnackbar';
import { createCentre, timeslotAdded } from '../../../actions/centre';
import { toggle, handleChange } from '../../../utils';
import Geocode from 'react-geocode';
import DialogWindowAddCentre from './DialogWindowAddCentre';


Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setRegion('ca');
Geocode.enableDebug();


export default class AddCentre extends Component {
  state = {
    open: false,
    name: "",
    city: "",
    address: "",
    postalCode: "",
    number: "",
    url: "",
    info: "",
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, city, postalCode, number, url, info } = this.state;
    if (!timeslotAdded(this))
      return;
    const addr = `${address}, ${city}, Ontario, Canada ${postalCode}`;
    Geocode.fromAddress(addr).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        const location = { address, city, postalCode, latitude: lat, longitude: lng };
        const newCentre = { name, location, phoneNumber: number, url, hours: this.hours, info };
        createCentre(this, newCentre);
      },
      error => {
        console.error(error);
        this.setState({ snackbarOpen: true, snackbarMessage: "Incomplete address", snackbarSeverity: "warning" });
      }
    );
  };

  render() {
    const { snackbarMessage, snackbarOpen, snackbarSeverity } = this.state;
    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="primary"
          onClick={() => toggle(this, "open")}
        >
          Add Assessment Centre
        </Button>
        <DialogWindowAddCentre
          onClose={() => toggle(this, "open")}
          onChange={(e) => handleChange(this, e)}
          handleSubmit={this.handleSubmit}
          title='Add Centre'
          heading='To add an assessment centre to this website, please fill out the form below.'
          comp={this}
        />
        <CustomizedSnackbar
          message={snackbarMessage}
          severity={snackbarSeverity}
          open={snackbarOpen}
          toggleSnackbar={() => toggle(this, "snackbarOpen")}
        />
      </React.Fragment>
    );
  }
}
