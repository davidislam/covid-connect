import axios from 'axios';
import { handleError } from './../utils';

const log = console.log;

const api = axios.create({
  baseURL: 'http://localhost:5000'
})


function changeTimeslotIsTaken(cid, day, tid) {
  api.patch(`/centres/${cid}/${day}/${tid}`)
}

function bookAppointment(date, time, address, tid) {
  api.post('/appointments', { date, time, address, tid })
}

export function addAppointment(hoursForm, cid, day, appt) {
  const { date, time, address, tid } = appt;
  axios.all([changeTimeslotIsTaken(cid, day, tid), bookAppointment(date, time, address, tid)])
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