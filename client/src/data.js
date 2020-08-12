/* Hard-coded data for phase 1 */
import { v4 as uuidv4 } from 'uuid';

export const CITIES = ["Brampton", "Hamilton", "Mississauga", "Ottawa", "Sudbury", "Toronto", "Waterloo"]

export const CENTRES = [
  {
    _id: uuidv4(),
    name: "Humber River Hospital Assessment Centre",
    location: {
      city: "Toronto",
      address: "2111 Finch Avenue West",
      postalCode: "M3N 1N1",
      latitude: 43.754540,
      longitude: -79.525770
    },
    phoneNumber: "416-747-6740",
    url: "https://www.hrh.ca/covid-19/",
    hours: {
      monday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      tuesday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      wednesday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      thursday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      friday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      saturday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      sunday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
    }
  },
  {
    _id: uuidv4(),
    name: "Michael Garron Hospital - Emergency Department",
    location: {
      city: "Toronto",
      address: "825 Coxwell Avenue",
      postalCode: "M4C 3E7",
      latitude: 43.692340,
      longitude: -79.327290
    },
    phoneNumber: "416-469-6858",
    url: "https://www.tehn.ca/programs-services/covid-19-assessment-centre",
    hours: {
      monday: [
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 PM", isTaken: false }
      ],
      tuesday: [
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 PM", isTaken: false }
      ],
      wednesday: [
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 PM", isTaken: false }
      ],
      thursday: [
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 PM", isTaken: false }
      ],
      friday: [
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 PM", isTaken: false }
      ],
      saturday: [
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 PM", isTaken: false }
      ],
      sunday: [
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 PM", isTaken: false }
      ],
    }
  },
  {
    _id: uuidv4(),
    name: "Mount Sinai Hospital",
    location: {
      city: "Toronto",
      address: "600 University Avenue",
      postalCode: "M5G 1X5",
      latitude: 43.657269,
      longitude: -79.390266
    },
    phoneNumber: "416-586-4800",
    url: "https://www.sinaihealth.ca/covid19/",
    hours: {
      monday: [
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false }
      ],
      tuesday: [
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false }
      ],
      wednesday: [
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false }
      ],
      thursday: [
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false }
      ],
      friday: [
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false }
      ],
      saturday: [
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false }
      ],
      sunday: [
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false }
      ],
    }
  },
  {
    _id: uuidv4(),
    name: "Trillium Health Partners",
    location: {
      city: "Mississauga",
      address: "15 Bronte College Court",
      postalCode: "L5B 1M9",
      latitude: 43.572180,
      longitude: -79.605780
    },
    phoneNumber: "",
    url: "https://trilliumhealthpartners.ca/covid-19/A/assessment.html#starthere",
    hours: {
      monday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      tuesday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      wednesday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      thursday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      friday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      saturday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      sunday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
    }
  },
  {
    _id: uuidv4(),
    name: "William Osler Health System",
    location: {
      city: "Brampton",
      address: "500 Ray Lawson Boulevard",
      postalCode: "L6W 2Z8",
      latitude: 43.652218,
      longitude: -79.735083
    },
    phoneNumber: "",
    url: "https://www.williamoslerhs.ca/patients-and-families/preparing-for-your-visit-or-stay/coronavirus-information-for-patients-families/assessment-centre-for-covid-19",
    hours: {
      monday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false }
      ],
      tuesday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false }
      ],
      wednesday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false }
      ],
      thursday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false }
      ],
      friday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false }
      ],
      saturday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false }
      ],
      sunday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "5:00 - 6:00 PM", isTaken: false }
      ],
    }
  },
  {
    _id: uuidv4(),
    name: "Dave Andreychuk Mountain Arena Assessment Centre",
    location: {
      city: "Hamilton",
      address: "25 Hester Street",
      postalCode: "L9A 2N3",
      latitude: 43.224648,
      longitude: -79.881459
    },
    phoneNumber: "905-974-9848",
    url: "https://www.hamilton.ca/coronavirus/assessment-centres",
    hours: {
      monday: [
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false }
      ],
      tuesday: [
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false }
      ],
      wednesday: [
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false }
      ],
      thursday: [
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false }
      ],
      friday: [
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "11:00 - 12:00 PM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false }
      ],
      saturday: [],
      sunday: [],
    }
  },
  {
    _id: uuidv4(),
    name: "Hamilton Health Sciences",
    location: {
      city: "Hamilton",
      address: "690 Main Street West",
      postalCode: "L8S 1A4",
      latitude: 43.25997,
      longitude: -79.898067
    },
    phoneNumber: "905-974-9848",
    url: "https://www.hamilton.ca/coronavirus/assessment-centres",
    hours: {
      monday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      tuesday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      wednesday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      thursday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      friday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      saturday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      sunday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
    }
  },
  {
    _id: uuidv4(),
    name: "Brewer Park Arena",
    location: {
      city: "Ottawa",
      address: "151 Brewer Way",
      postalCode: "K1S 5T1",
      latitude: 45.389189,
      longitude: -75.691072
    },
    phoneNumber: "",
    url: "https://www.ottawapublichealth.ca/en/public-health-topics/novel-coronavirus.aspx",
    hours: {
      monday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      tuesday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      wednesday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      thursday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      friday: [
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "2:00 - 3:00 PM", isTaken: false }
      ],
      saturday: [],
      sunday: [],
    }
  },
  {
    _id: uuidv4(),
    name: "Queensway Carlton Hospital",
    location: {
      city: "Ottawa",
      address: "595 Moodie Drive",
      postalCode: "K2H 8A8",
      latitude: 45.309481,
      longitude: -75.825836
    },
    phoneNumber: "",
    url: "https://www.ottawapublichealth.ca/en/public-health-topics/novel-coronavirus.aspx",
    hours: {
      monday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "3:00 - 4:00 PM", isTaken: false },
        { _id: uuidv4(), time: "4:00 - 5:00 PM", isTaken: false }
      ],
      tuesday: [],
      wednesday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "3:00 - 4:00 PM", isTaken: false },
        { _id: uuidv4(), time: "4:00 - 5:00 PM", isTaken: false }
      ],
      thursday: [],
      friday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "3:00 - 4:00 PM", isTaken: false },
        { _id: uuidv4(), time: "4:00 - 5:00 PM", isTaken: false }
      ],
      saturday: [],
      sunday: [],
    }
  },
  {
    _id: uuidv4(),
    name: "NEOMO Medical",
    location: {
      city: "Sudbury",
      address: "885 Prete Street",
      postalCode: "P3E 3X9",
      latitude: 46.473006,
      longitude: -81.005973
    },
    phoneNumber: "705-671-7373",
    url: "https://www.hsnsudbury.ca/portalen/Patients-and-Visitors/COVID-19/COVID-19-Assessment-Centre",
    hours: {
      monday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false }
      ],
      tuesday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false }
      ],
      wednesday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false }
      ],
      thursday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false }
      ],
      friday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false }
      ],
      saturday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false }
      ],
      sunday: [
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false },
        { _id: uuidv4(), time: "10:00 - 11:00 AM", isTaken: false },
        { _id: uuidv4(), time: "6:00 - 7:00 PM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 PM", isTaken: false }
      ],
    }
  },
  {
    _id: uuidv4(),
    name: "Primacy Medical Centre",
    location: {
      city: "Sudbury",
      address: "1485 Lasalle Boulevard",
      postalCode: "P3A 1Z8",
      latitude: 46.522044,
      longitude: -80.940311
    },
    phoneNumber: "705-671-7373",
    url: "https://www.hsnsudbury.ca/portalen/Patients-and-Visitors/COVID-19/COVID-19-Assessment-Centre",
    hours: {
      monday: [
        { _id: uuidv4(), time: "6:00 - 7:00 AM", isTaken: false },
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "4:00 - 5:00 PM", isTaken: false }
      ],
      tuesday: [
        { _id: uuidv4(), time: "6:00 - 7:00 AM", isTaken: false },
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "4:00 - 5:00 PM", isTaken: false }
      ],
      wednesday: [
        { _id: uuidv4(), time: "6:00 - 7:00 AM", isTaken: false },
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "4:00 - 5:00 PM", isTaken: false }
      ],
      thursday: [
        { _id: uuidv4(), time: "6:00 - 7:00 AM", isTaken: false },
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "4:00 - 5:00 PM", isTaken: false }
      ],
      friday: [
        { _id: uuidv4(), time: "6:00 - 7:00 AM", isTaken: false },
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "1:00 - 2:00 PM", isTaken: false },
        { _id: uuidv4(), time: "4:00 - 5:00 PM", isTaken: false }
      ],
      saturday: [],
      sunday: [],
    }
  },
  {
    _id: uuidv4(),
    name: "St. Mary's General Hospital - Bathurst Site",
    location: {
      city: "Waterloo",
      address: "50 Bathurst Drive, Unit 1",
      postalCode: "N2V 2C5",
      latitude: 43.507664,
      longitude: -80.537881
    },
    phoneNumber: "519-885-9517",
    url: "https://www.smgh.ca/covid-19-testing-available-for-k-w-residents-with-symptoms-starting-may-16",
    hours: {
      monday: [
        { _id: uuidv4(), time: "6:00 - 7:00 AM", isTaken: false },
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false }
      ],
      tuesday: [
        { _id: uuidv4(), time: "6:00 - 7:00 AM", isTaken: false },
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false }
      ],
      wednesday: [
        { _id: uuidv4(), time: "6:00 - 7:00 AM", isTaken: false },
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false }
      ],
      thursday: [
        { _id: uuidv4(), time: "6:00 - 7:00 AM", isTaken: false },
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false }
      ],
      friday: [
        { _id: uuidv4(), time: "6:00 - 7:00 AM", isTaken: false },
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false }
      ],
      saturday: [
        { _id: uuidv4(), time: "6:00 - 7:00 AM", isTaken: false },
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false }
      ],
      sunday: [
        { _id: uuidv4(), time: "6:00 - 7:00 AM", isTaken: false },
        { _id: uuidv4(), time: "7:00 - 8:00 AM", isTaken: false },
        { _id: uuidv4(), time: "8:00 - 9:00 AM", isTaken: false },
        { _id: uuidv4(), time: "9:00 - 10:00 AM", isTaken: false }
      ],
    }
  }
]
