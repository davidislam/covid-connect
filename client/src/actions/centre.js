/* Server calls for assessment centres */
import { CENTRES } from '../data';

// Functions below require server calls

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

// Returns a list of unique city names
export function getCityNames() {
  return;
}

// Returns centre with name <name>
export function getCentreByName(name) {
  return CENTRES.filter(centre => centre.name === name)[0];
}

export function addTimeslot(centre, day, time) {
  // /centres/:id/:day/:time
}