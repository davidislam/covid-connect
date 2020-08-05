/* Methods to add/remove an appointment for a user */

export const addAppointment = (appt, app) => {
  app.setState(state => ({ appointments: state.appointments.concat([appt]) }))
}

export const deleteAppointment = (appt, app) => {
  appt.timeslot.isTaken = false;
  app.setState(state => ({ appointments: state.appointments.filter(a => { return a !== appt }) }))
}