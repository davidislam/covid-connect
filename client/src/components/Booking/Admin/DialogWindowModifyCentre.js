import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm } from 'react-material-ui-form-validator';
import CentreInfo from './CentreInfo';
import AddTimeslot from './AddTimeslot';
import Timeslots from './Timeslots';
import { handleSelectChange, getNonEmptyTimes } from '../../../actions/centre';


export default class DialogWindowModifyCentre extends Component {
  render() {
    const { onClose, onChange, handleSubmit, title, heading, comp } = this.props;
    const { open, selectedCentreID, centres, visibility } = comp.state;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="modify-centre"
      >
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogTitle id="modify-centre">{title}</DialogTitle>
          <DialogContent>

            <DialogContentText>
              {heading}
            </DialogContentText>

            <FormControl required>
              <InputLabel>Centre</InputLabel>
              <Select value={selectedCentreID} name="selectedCentreID" onChange={e => handleSelectChange(comp, e)} style={{ width: '50ch' }}>
                {centres.map(centre =>
                  <MenuItem key={centre._id} value={centre._id}>{centre.name}</MenuItem>)}
              </Select>
            </FormControl>

            <div style={{ visibility }}>
              <CentreInfo comp={comp} onChange={e => onChange(e)} />
              <AddTimeslot
                comp={comp}
                daysText='Add appointment times by selecting days and adding timeslots'
                timeText=''
              />
              <DialogContentText>
                Remove a timeslot
              </DialogContentText>
              <Timeslots comp={comp} timeslots={getNonEmptyTimes(comp)} />
            </div>

          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
           </Button>
            <Button type="submit" color="primary">
              Modify
            </Button>
          </DialogActions>

        </ValidatorForm>
      </Dialog>
    )
  }
}
