import axios from 'axios';
import { handleError } from './../utils';

const log = console.log;

const api = axios.create({
  baseURL: 'http://localhost:5000/appointments'
})

export function getAppointmentsForCurrentUser(comp) {
  api.get('/user')
    .then(res => {
      comp.setState({ appointments: res.data })
    })
    .catch(error => {
      handleError(error);
    })
}

// Requires admin auth
export function getAppointmentById(id) {
  api.get(`/${id}`)
    .then(res => {
      log(res);
    })
    .catch(error => {
      handleError(error);
    })
}

// Requires admin auth
export function changeAppointmentStatusById(id, status) {
  api.patch(`/${id}`, { status })
    .then(res => {
      log(res);
    })
    .catch(error => {
      handleError(error);
    })
}

// Requires admin auth
export function getAllAppointments() {
  api.get('/')
    .then(res => {
      log(res);
    })
    .catch(error => {
      handleError(error);
    })
}

export const getUserAppointments = async (comp) => {
  try {
    const appts = await api.get('/').then(({ data }) => data);
    const rs = appts.reduce((arr, appt) => {
      arr.push({
        id: appt._id,
        date: appt.date,
        time: appt.time,
        address: appt.address
      })
      return arr;
    }, [])
    comp.setState({ appointments: rs });
  } catch (error) {
    handleError(error);
    alert("Could not get user appointments");
  }
}


export function addAppointment(hoursForm, appt) {
  const { cid, day, tid } = appt;
  axios.all([
    api.patch(`/${cid}/${day}/${tid}`),
    api.post('/user', appt)
  ])
    .then(axios.spread((ts, appt) => {
      // Both requests are now complete
      log(ts);
      log(appt);
      hoursForm.setState({
        errorMessage: '',
        showSnackbar: true,
        snackbarMessage: "Appointment details have been added to your profile",
        snackbarSeverity: 'success',
        timeslots: ts.data
      })
    }))
    .catch(error => {
      alert("Could not schedule appointment");
      handleError(error);
    })
}

export function deleteAppointment(aid, cid, day, tid, comp) {
  axios.all([
    api.patch(`/${cid}/${day}/${tid}`),
    api.delete(`/${aid}`),
    api.get('/user')
  ])
    .then(axios.spread((ts, canceledAppt, appts) => {
      log(ts);
      log(canceledAppt);
      log(appts);
      comp.setState({ appointments: appts.data });
    }))
    .catch(error => {
      alert("Could not cancel appointment");
      handleError(error);
    })
}
