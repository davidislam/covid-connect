
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


// /* Returns a list of Material UI MenuItems */
// showTimeslots() {
//   const rs = [];
//   // console.log(this.hours);
//   // Ensure <hours> is defined
//   const hours = {
//     monday: [], tuesday: [], wednesday: [], thursday: [], friday: [],
//     saturday: [], sunday: []
//   };
//   this.hours = this.hours === undefined ? hours : this.hours;
//   // console.log(this.hours);
//   daysCapitalized.forEach(day => {
//     const dayLower = day.toLowerCase();
//     // console.log(dayLower);
//     // console.log(this.hours);
//     if (this.hours[dayLower].length !== 0) {
//       // Add each timeslot for that day
//       this.hours[dayLower].forEach(ts => {
//         const booked = ts.isTaken ? 'booked' : 'not booked';
//         const title = `${day} ${ts.time}, ${booked}`;
//         const e = <MenuItem key={ts._id} value={ts._id} day={dayLower}>{title}</MenuItem>;
//         rs.push(e);
//       })
//     }
//   })

//   return rs;
// }


{/* 

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
                </div> */}


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