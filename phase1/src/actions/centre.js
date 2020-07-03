/* Methods to add/remove assessment centres */
import { CENTRES } from '../data';

export function addCentre(centre, days) {
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