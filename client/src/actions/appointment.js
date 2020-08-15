import axios from 'axios';

const log = console.log;

const api = axios.create({
  baseURL: '/appointments'
})

export function getAppointmentsForCurrentUser(comp) {
  api.get('/user')
    .then(res => {
      comp.setState({ appointments: res.data })
    })
    .catch(error => {
      log(error);
    })
}

// Requires admin auth
export function getAppointmentById(id) {
  api.get(`/${id}`)
    .then(res => {
      log(res);
    })
    .catch(error => {
      log(error);
    })
}

// Requires admin auth
export function changeAppointmentStatusById(id, status, comp) {
  api.patch(`/${id}`, { status })
    .then(res => {
      comp.setState({
        snackbarMessage: "Appointment status successfully changed",
        snackbarSeverity: "success",
        snackbarOpen: true,
      })
    })
    .catch(error => {
      comp.setState({
        snackbarMessage: "Could not change appointment status",
        snackbarSeverity: "error",
        snackbarOpen: true,
      })
      log(error);
    })
}

// Requires admin auth
export function getAllAppointments() {
  api.get('/')
    .then(res => {
      log(res);
    })
    .catch(error => {
      log(error);
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
        address: appt.address,
        name: appt.name,
        status: appt.status
      })
      return arr;
    }, [])
    comp.setState({ appointments: rs });
  } catch (error) {
    log(error);
  }
}


export function addAppointment(hoursForm, appt) {
  const { cid, day, tid } = appt;
  axios.all([
    api.patch(`/${cid}/${day}/${tid}`),
    api.post('/user', appt)
  ])
    .then(axios.spread((ts, appt) => {
      hoursForm.setState({
        errorMessage: '',
        showSnackbar: true,
        snackbarMessage: "Appointment details have been added to your profile",
        snackbarSeverity: 'success',
        timeslots: ts.data,
        chosenTimeId: ''
      })
    }))
    .catch(error => {
      hoursForm.setState({
        errorMessage: '',
        showSnackbar: true,
        snackbarMessage: "Could not book appointment",
        snackbarSeverity: 'error'
      })
      log(error);
    })
}

export function deleteAppointment(aid, cid, day, tid, comp) {
  axios.all([
    api.delete(`/${aid}`),
    api.get('/user'),
    api.patch(`/${cid}/${day}/${tid}`),
  ])
    .then(axios.spread((canceledAppt, appts, ts) => {
      comp.setState({ appointments: appts.data });
    }))
    .catch(error => {
      log(error);
    })
}
