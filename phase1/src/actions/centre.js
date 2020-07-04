/* Methods to add/remove assessment centres */
import { CENTRES } from '../data';

export function addCentre(centre, days) {
  // Code below requires server call
  const newCentre = {
    name: centre.name,
    location: {
      city: centre.city,
      address: centre.address,
      postal_code: centre.postal_code
    },
    number: centre.number,
    website: centre.website,
    days,
    hours: centre.hours
  }
  CENTRES.push(newCentre);
}

export function removeCentre(i) {
  const removedCentre = CENTRES.splice(i, 1);
  // TODO: notify registered users at the centre
  console.log("A centre has been removed", removedCentre);
}