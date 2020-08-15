import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CustomizedSnackbar from '../../CustomizedSnackbar';
import { modifyCentreById, getCentres } from '../../../actions/centre';
import { toggle, handleChange } from '../../../utils';
import Geocode from 'react-geocode';
import DialogWindowModifyCentre from './DialogWindowModifyCentre';


Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setRegion('ca');
Geocode.enableDebug();


export default class ModifyCentre extends Component {
  state = {
    centres: [],
    selectedCentreID: '',
    open: false,
    name: "",
    city: "",
    address: "",
    postalCode: "",
    number: "",
    url: "",
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    startTime: "",
    startMeridiem: "",
    endTime: "",
    endMeridiem: "",
    snackbarMessage: "",
    snackbarSeverity: "",
    snackbarOpen: false,
    visibility: "hidden",
    timeslotId: '',
    timeslotDay: '',
  };

  constructor(props) {
    super(props);
    this.hours = {
      monday: [], tuesday: [], wednesday: [], thursday: [], friday: [],
      saturday: [], sunday: []
    };
  }

  componentDidMount() {
    getCentres(this);
    // this.hours = {
    //   monday: [], tuesday: [], wednesday: [], thursday: [], friday: [],
    //   saturday: [], sunday: []
    // };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, city, postalCode, number, url, selectedCentreID } = this.state;

    if (selectedCentreID === '') {
      this.setState({ snackbarOpen: true, snackbarMessage: "Please select a centre to modify", snackbarSeverity: "warning" });
      return;
    }

    const addr = `${address}, ${city}, Ontario, Canada ${postalCode}`;
    Geocode.fromAddress(addr).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        const location = { address, city, postalCode, latitude: lat, longitude: lng };
        const modifiedCentre = { name, location, phoneNumber: number, url, hours: this.hours };
        modifyCentreById(selectedCentreID, modifiedCentre, this);
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
          Modify Assessment Centre
        </Button>

        <DialogWindowModifyCentre
          onClose={() => toggle(this, "open")}
          onChange={(e) => handleChange(this, e)}
          handleSubmit={this.handleSubmit}
          title='Modify Centre'
          heading='Please choose an assessment centre and modify any details below.'
          comp={this}
        />

        <CustomizedSnackbar
          message={snackbarMessage}
          severity={snackbarSeverity}
          open={snackbarOpen}
          toggleSnackbar={() => toggle(this, "snackbarOpen")}
        />

      </React.Fragment>

      // <Dialog
      //   open={open}
      //   onClose={this.handleClose}
      //   aria-labelledby="form-dialog-title"
      // >
      //   <ValidatorForm onSubmit={this.handleSubmit}>
      //     <DialogTitle id="form-dialog-title">Modify Centre</DialogTitle>
      //     <DialogContent>
      //       <DialogContentText>
      //         Please choose an assessment centre and modify any details below.
      //       </DialogContentText>
      //       <CustomizedSelect
      //         label="Centre"
      //         value={centreName}
      //         name="centreName"
      //         onChange={(e) => this.handleSelectChange(e)}
      //         w="20ch"
      //         arr={CENTRES.map((centre) => {
      //           return centre.name
      //         })}
      //       />

      //     </DialogContent>
      //     <DialogActions>
      //       <Button onClick={this.handleClose} color="primary">
      //         Cancel
      //     </Button>
      //       <Button type="submit" color="primary">
      //         Modify
      //     </Button>
      //     </DialogActions>
      //   </ValidatorForm>
      // </Dialog>

      // </div>
    );
  }
}
