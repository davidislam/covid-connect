import { CENTRES } from '../data';
import axios from 'axios';
import { handleError, days, months } from './../utils';


const api = axios.create({
  baseURL: 'http://localhost:5000'
})

const log = console.log;

export function modifyCentre(centre, hours, lat, lng) {
  const centreToModify = CENTRES.filter(c => c._id === centre.centreID)[0];
  console.log(centreToModify);
  // Modify details...
  // centreToModify.name = centre.name;
  // centreToModify.
}

export function addCentre(centre, hours, lat, lng) {
  // Code below requires server call
  const newCentre = {
    name: centre.name,
    location: {
      city: centre.city,
      address: centre.address,
      postalCode: centre.postalCode,
      latitude: lat,
      longitude: lng,
    },
    phoneNumber: centre.number,
    url: centre.url,
    hours,
  }
  CENTRES.push(newCentre);
}

export function removeCentre(i) {
  const removedCentre = CENTRES.splice(i, 1);
  // TODO: notify registered users at the centre
  console.log("A centre has been removed", removedCentre);
}

// Returns a list of assessment centre names
export function getCentreNames() {
  return;
}

export function getCityNames(booking) {
  api.get('/city')
    .then(res => {
      booking.setState({ cities: res.data });
    })
    .catch(error => {
      alert("Could not get city names");
      handleError(error);
    })
}

export function getCentres(comp) {
  api.get('/centres')
    .then(res => {
      comp.setState({ centres: res.data })
    })
    .catch(error => {
      alert("Could not get centres");
      handleError(error);
    })
}

export function getCentresByCityForDay(comp, city, date) {
  const day = getDay(date);
  const dateStr = date.toLocaleDateString();

  api.get(`/centres/city/${city}`, {
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

// Returns centre with name <name>
export function getCentreByName(name) {
  return CENTRES.filter(centre => centre.name === name)[0];
}

export function addTimeslot(centre, day, time) {
  // /centres/:id/:day/:time
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

