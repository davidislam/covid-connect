import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CustomizedSnackbar from '../../../CustomizedSnackbar';

import { addNewsArticle } from '../../../../actions/news'
//import { createCentre, timeslotAdded } from '../../../actions/centre';
import { toggle, handleChange } from '../../../../utils';
import DialogWindowAddNews from './DialogWindowAddNews';

export default class AddCentre extends Component {
  state = {
    link: "",
    image: "",
    heading: "",

    snackbarMessage: "",
    snackbarSeverity: "",
    snackbarOpen: false,
  };

  // componentDidMount() {
  //   this.hours = {
  //     monday: [], tuesday: [], wednesday: [], thursday: [], friday: [],
  //     saturday: [], sunday: []
  //   };
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { link, image, heading } = this.state;
      const newArticle = {link, image, heading}
      addNewsArticle(this, newArticle);
    } catch (error) {
      console.error(error);
      this.setState({ snackbarOpen: true, snackbarMessage: "Incomplete address", snackbarSeverity: "warning" });
    }
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
          Add News Article
        </Button>
        <DialogWindowAddCentre
          onClose={() => toggle(this, "open")}
          onChange={(e) => handleChange(this, e)}
          handleSubmit={this.handleSubmit}
          title='Add News'
          heading='To add the information for a news article, please fill out the form below.'
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
