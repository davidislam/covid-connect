import axios from 'axios';
import { handleError, days, months } from './../utils';


const api = axios.create({
  baseURL: '/centres'
})

const log = console.log;

export function createCentre(centre) {
  api.post('/', centre)
    .then(res => {
      log(res);
    })
    .catch(error => {
      handleError(error);
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

export function removeCentreById(id) {
  api.delete(`/${id}`)
    .then(res => {
      log(res)
    })
    .catch(error => {
      handleError(error);
    })
}

export function modifyCentreById(id) {
  api.patch(`/${id}`)
    .then(res => {
      log(res)
    })
    .catch(error => {
      handleError(error);
    })
}


// Returns a list of assessment centre names
export function getCentreNames() {
  return;
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
  return days[date.getDay()].toLowerCase();
}

// Returns a formatted address in the form "<addr>, <city>, ON <postal code>""
export function formattedAddress(location) {
  return `${location.address}, ${location.city}, ON ${location.postalCode}`
}

