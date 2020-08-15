import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm } from 'react-material-ui-form-validator';
import CentreInfo from './CentreInfo';
import AddTimeslot from './AddTimeslot';


export default class DialogWindowAddCentre extends Component {
  render() {
    const { onClose, onChange, handleSubmit, title, heading } = this.props;
    const { open } = this.props.comp.state;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="add-centre"
      >
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogTitle id="add-centre">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {heading}
            </DialogContentText>
            <CentreInfo
              comp={this.props.comp}
              onChange={e => onChange(e)}
            />
            <AddTimeslot
              comp={this.props.comp}
              daysText='Select the days of availability.'
              timeText='Choose the times for the selected days.'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
           </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    )
  }
}
