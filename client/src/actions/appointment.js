import axios from 'axios';
import { handleError } from './../utils';

const log = console.log;

const api = axios.create({
  baseURL: 'http://localhost:5000'
})

export function getAppointments(comp) {
  api.get('/appointments')
    .then(res => {
      comp.setState({ appointments: res.data })
    })
    .catch(error => {
      handleError(error);
    })
}

function _getAppointments() {
  api.get('/appointments');
}


function changeTimeslotIsTaken(cid, day, tid) {
  api.patch(`/centres/${cid}/${day}/${tid}`)
}

function bookAppointment(appt) {
  api.post('/appointments', appt);
}

export function addAppointment(hoursForm, appt) {
  const { cid, day, tid } = appt;
  axios.all([changeTimeslotIsTaken(cid, day, tid), bookAppointment(appt)])
    .then(axios.spread((ts, appt) => {
      // Both requests are now complete
      log(ts, appt);
      hoursForm.setState({
        errorMessage: '', showSnackbar: true,
        snackbarMessage: "Appointment details have been added to your profile", snackbarSeverity: 'success'
      })
    }))
    .catch(error => {
      alert("Could not schedule appointment");
      handleError(error);
    })
}

function cancelAppointment(id) {
  api.delete(`/appointments/${id}`)
}

export function deleteAppointment(aid, cid, day, tid, comp) {
  axios.all([changeTimeslotIsTaken(cid, day, tid), cancelAppointment(aid), _getAppointments()])
    .then(axios.spread((ts, canceledAppt, appts) => {
      // Both requests are now complete
      log(ts, canceledAppt, appts);
      comp.setState({ appointments: appts.data });
    }))
    .catch(error => {
      alert("Could not cancel appointment");
      handleError(error);
    })
}
