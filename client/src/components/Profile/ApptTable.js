import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { getAppointments, deleteAppointment } from './../../actions/appointment';


import './styles.css';


export default class ApptTable extends Component {
  state = {
    appointments: []
  }

  constructor(props) {
    super(props);
    getAppointments(this);
  }


  handleClick = (appt) => {
    const { _id, timeslot, cid, day } = appt;
    deleteAppointment(_id, cid, day, timeslot, this);
  }

  render() {
    return (
      this.state.appointments.length === 0 ? <h3>No appointments scheduled</h3> :
        <TableContainer component={Paper} className='apptTable'>
          <Table aria-label="simple table" size='small'>
            <TableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Time</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Test Result</TableCell>
                <TableCell align="center">Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.appointments.map((appt) => (
                <TableRow key={appt._id}>
                  <TableCell component="th" scope="row" align="center">
                    {appt.date}
                  </TableCell>
                  <TableCell align="center">{appt.time}</TableCell>
                  <TableCell align="center">{appt.address}</TableCell>
                  <TableCell align="center">{appt.status}</TableCell>
                  <TableCell align="center">
                    <Button color="secondary" onClick={() => this.handleClick(appt)}>
                      Cancel
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
  }
}
