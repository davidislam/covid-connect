import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm } from 'react-material-ui-form-validator';

import NewsInfo from './NewsInfo';


export default class DialogWindowAddNews extends Component {
  render() {

    const { onClose, onChange, handleSubmit, title, heading } = this.props;
    const { open } = this.props.comp.state;
    
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="add-news"
      >
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogTitle id="add-news">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {heading}
            </DialogContentText>
            <NewsInfo
              comp={this.props.comp}
              onChange={e => onChange(e)}
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
