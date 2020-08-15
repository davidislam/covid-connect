import axios from 'axios';
import { handleError, days, daysCapitalized, months } from './../utils';


const api = axios.create({
  baseURL: '/centres'
})

const log = console.log;


export function createCentre(comp, centre) {
  api.post('/', centre)
    .then(res => {
      log(res);
      comp.setState({
        open: false,
        name: "",
        city: "",
        address: "",
        postalCode: "",
        number: "",
        url: "",
        startTime: "",
        startMeridiem: "",
        endTime: "",
        endMeridiem: "",
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        snackbarMessage: "Assessment centre added",
        snackbarSeverity: "success",
        snackbarOpen: true,
      })
    })
    .catch(error => {
      handleError(error);
      comp.setState({
        snackbarMessage: "Could not add centre",
        snackbarSeverity: "error",
        snackbarOpen: true
      })
    })
}

export function getCentreById(id) {
  api.get(`/${id}`)
    .then(res => {
      log(res);
    })
    .catch(error => {
      handleError(error);
    })
}

export function removeCentreById(comp, id) {
  api.delete(`/${id}`)
    .then(res => {
      log(res);
      comp.setState({
        snackbarOpen: true,
        snackbarMessage: `${res.data.name} has been removed from the database`,
        snackbarSeverity: 'success',
        cid: ''
      })
    })
    .catch(error => {
      handleError(error);
      comp.setState({
        snackbarOpen: true,
        snackbarMessage: 'Could not remove centre',
        snackbarSeverity: 'error'
      })
    })
}

export function modifyCentreById(id, centre, comp) {
  api.patch(`/${id}`, centre)
    .then(res => {
      log(res)
      comp.setState({
        centres: [],
        selectedCentreID: "",
        open: false,
        name: "",
        city: "",
        address: "",
        postalCode: "",
        number: "",
        url: "",
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        startTime: "",
        startMeridiem: "",
        endTime: "",
        endMeridiem: "",
        snackbarMessage: "Assessment centre modified",
        snackbarSeverity: "success",
        snackbarOpen: true,
        visibility: 'hidden',
        timeslotId: '',
        timeslotDay: '',
      })
    })
    .catch(error => {
      handleError(error);
      comp.setState({
        snackbarMessage: "Could not modify centre",
        snackbarSeverity: "error",
        snackbarOpen: true
      })
    })
}


export function getCentreNames(comp) {
  api.get('/', {
    transformResponse: data => {
      const centreNames = JSON.parse(data).map(centre => centre.name);
      // log(centreNames);
      return centreNames;
    }
  })
    .then(res => {
      comp.setState({ centres: res.data })
    })
    .catch(error => {
      alert("Could not get centre names");
      handleError(error);
    })
}

export function getCityNames(booking) {
  api.get('/city-names')
    .then(res => {
      booking.setState({ cities: res.data });
    })
    .catch(error => {
      alert("Could not get city names");
      handleError(error);
    })
}

export function getCentres(comp) {
  api.get('/')
    .then(res => {
      comp.setState({ centres: res.data })
    })
    .catch(error => {
      alert("Could not get centres");
      handleError(error);
    })
}

export function getCentresForMap(setCentres) {
  api.get('/')
    .then(res => {
      setCentres(res.data);
    })
    .catch(error => {
      alert("Could not get centres");
      handleError(error);
    })
}

export function getCentresByCityForDay(comp, city, date) {
  const day = getDay(date);
  const dateStr = date.toLocaleDateString();

  api.get(`/city/${city}`, {
    transformResponse: data => {
      const filteredCentres = JSON.parse(data).filter(centre => centre.hours[day].length !== 0)
      // log(filteredCentres);
      return filteredCentres;
    }
  })
    .then(res => {
      const centres = res.data;
      const message = centres.length === 0 ? 'No centres found' :
        `COVID-19 assessment centres in ${city} for ${dateStr}`;
      comp.setState({ centres, message })
    })
    .catch(error => {
      alert(`Could not get centres in ${city} for ${dateStr}`);
      handleError(error);
    })
}

// Returns a formatted date in the form "<month> <day>, <year>"
export function formattedDate(date) {
  const monthNum = date.getMonth();
  const monthName = months[monthNum];
  return `${monthName} ${date.getDate()}, ${date.getFullYear()}`
}

// Returns a day of the week in lowercase
export function getDay(date) {
  return days[date.getDay()];
}

// Returns a formatted address in the form "<addr>, <city>, ON <postal code>""
export function formattedAddress(location) {
  return `${location.address}, ${location.city}, ON ${location.postalCode}`
}

// Returns true iff a timeslot has been added
export function timeslotAdded(comp) {
  for (let i = 0; i < days.length; i++) {
    if (comp.hours[days[i]].length !== 0) {
      return true;
    }
  }
  comp.setState({ snackbarOpen: true, snackbarMessage: "Please add a timeslot", snackbarSeverity: "warning" });
  return false;
}

// Returns true iff a day has been selected
export function daySelected(comp) {
  for (let i = 0; i < days.length; i++) {
    if (comp.state[days[i]]) {
      return true;
    }
  }
  comp.setState({ snackbarOpen: true, snackbarMessage: "Please choose a day", snackbarSeverity: "warning" });
  return false;
}


// Returns true iff a timeslot has been added
export const addTimeslot = (comp) => {
  if (!daySelected(comp))
    return false;

  const { startTime, startMeridiem, endTime, endMeridiem } = comp.state;
  if (startTime === "" || startMeridiem === "" || endTime === "" || endMeridiem === "") {
    comp.setState({ snackbarOpen: true, snackbarMessage: "Please choose a time", snackbarSeverity: "warning" })
    return false;
  }

  const formattedTime = `${startTime} - ${endTime} ${endMeridiem}`;
  const timeslot = { time: formattedTime, isTaken: false };

  // Add <timeslot> to checked days
  days.forEach(day => {
    if (comp.state[day]) {
      comp.hours[day].push(timeslot);
    }
  })

  log(comp.hours);

  comp.setState({
    startTime: '', startMeridiem: '', endTime: '', endMeridiem: '',
    snackbarOpen: true, snackbarMessage: "Timeslot added", snackbarSeverity: 'info',
    monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false
  });
  return true;
}


// Returns centre object with id <cid> upon success
const getCentre = async (cid) => {
  try {
    const centre = await api.get(`/${cid}`).then(({ data }) => data);
    return centre;
  } catch (error) {
    log(error);
    alert('Could not get centre')
  }
}

// Get selected centre and update form fields with respect to the centre
export const handleSelectChange = (comp, e) => {
  const value = e.target.value; // cid
  const centre = getCentre(value);
  if (!centre)
    return;
  const { _id, name, location, phoneNumber, url, hours } = centre;
  const { city, address, postalCode } = location;

  comp.hours = hours;

  comp.setState({
    centreID: _id,
    name,
    city,
    address,
    postalCode,
    number: phoneNumber,
    url,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    startTime: "",
    startMeridiem: "",
    endTime: "",
    endMeridiem: "",
    visibility: 'visible',
    timeslotId: '',
    timeslotDay: ''
  })
}


// Returns a list of timeslots with title "<day> <time>, <booked>""
export const getNonEmptyTimes = (comp) => {
  const rs = [];

  daysCapitalized.forEach(day => {
    const dayLowerCase = day.toLowerCase();
    const arr = comp.hours[dayLowerCase];
    if (arr.length !== 0) {
      // Add each ts in arr
      arr.forEach(ts => {
        const id = ts._id;
        const isBooked = ts.isTaken ? 'booked' : 'not booked';
        const title = `${day} ${ts.time}, ${isBooked}`;
        rs.push({ id, title });
      })
    }
  })

  return rs;
}
