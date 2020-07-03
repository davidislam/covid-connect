import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { uid } from 'react-uid';


export default class ApptTable extends Component {
  handleClick = (appt) => {
    this.props.deleteAppt(appt);
  }

  render() {
    return (
      this.props.appointments.length === 0 ? <h3>No appointments scheduled</h3> :
        <TableContainer component={Paper} style={tableStyle}>
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
              {this.props.appointments.map((appt) => (
                <TableRow key={uid(appt)}>
                  <TableCell component="th" scope="row" align="center">
                    {appt.date}
                  </TableCell>
                  <TableCell align="center">{appt.timeslot.time}</TableCell>
                  <TableCell align="center">{appt.address}</TableCell>
                  <TableCell align="center">Pending</TableCell>
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

const tableStyle = {
  // maxWidth: '70%',
  // marginLeft: '15%',
  // marginRight: '15%',
  marginTop: '30px'
}