const everyday = {
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: true,
  sunday: true
}

const workdays = {
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: false,
  sunday: false
}

export const CITIES = ["Brampton", "Hamilton", "Mississauga", "Ottawa", "Sudbury", "Toronto", "Waterloo"]

// Obtain centres info from server
export const CENTRES = [
  {
    name: "Humber River Hospital Assessment Centre",
    location: {
      city: "Toronto",
      address: "2111 Finch Avenue West",
      postal_code: "M3N 1N1"
    },
    number: "416-747-6740",
    website: "https://www.hrh.ca/covid-19/",
    days: everyday,
    hours: [
      { time: "9:00 - 10:00 AM", is_taken: false },
      { time: "11:00 - 12:00 PM", is_taken: false },
      { time: "1:00 - 2:00 PM", is_taken: false },
      { time: "2:00 - 3:00 PM", is_taken: false }
    ]
  },
  {
    name: "Michael Garron Hospital - Emergency Department",
    location: {
      city: "Toronto",
      address: "825 Coxwell Avenue",
      postal_code: "M4C 3E7"
    },
    number: "416-469-6858",
    website: "https://www.tehn.ca/programs-services/covid-19-assessment-centre",
    days: everyday,
    hours: [
      { time: "5:00 - 6:00 PM", is_taken: false },
      { time: "6:00 - 7:00 PM", is_taken: false },
      { time: "8:00 - 9:00 PM", is_taken: false },
      { time: "10:00 - 11:00 PM", is_taken: false }
    ]
  },
  {
    name: "Mount Sinai Hospital",
    location: {
      city: "Toronto",
      address: "600 University Avenue",
      postal_code: "M5G 1X5"
    },
    number: "416-586-4800",
    website: "https://www.sinaihealth.ca/covid19/",
    days: workdays,
    hours: [
      { time: "8:00 - 9:00 AM", is_taken: false },
      { time: "9:00 - 10:00 AM", is_taken: false },
      { time: "10:00 - 11:00 AM", is_taken: false },
      { time: "11:00 - 12:00 PM", is_taken: false }
    ]
  },
  {
    name: "Trillium Health Partners",
    location: {
      city: "Mississauga",
      address: "15 Bronte College Court",
      postal_code: "L5B 1M9"
    },
    number: "",
    website: "https://trilliumhealthpartners.ca/covid-19/A/assessment.html#starthere",
    days: everyday,
    hours: [
      { time: "9:00 - 10:00 AM", is_taken: false },
      { time: "11:00 - 12:00 PM", is_taken: false },
      { time: "1:00 - 2:00 PM", is_taken: false },
      { time: "2:00 - 3:00 PM", is_taken: false }
    ]
  },
  {
    name: "William Osler Health System",
    location: {
      city: "Brampton",
      address: "500 Ray Lawson Boulevard",
      postal_code: "L6W 2Z8"
    },
    number: "",
    website: "https://www.williamoslerhs.ca/patients-and-families/preparing-for-your-visit-or-stay/coronavirus-information-for-patients-families/assessment-centre-for-covid-19",
    days: everyday,
    hours: [
      { time: "7:00 - 8:00 AM", is_taken: false },
      { time: "11:00 - 12:00 PM", is_taken: false },
      { time: "1:00 - 2:00 PM", is_taken: false },
      { time: "5:00 - 6:00 PM", is_taken: false }
    ]
  },
  {
    name: "Dave Andreychuk Mountain Arena Assessment Centre",
    location: {
      city: "Hamilton",
      address: "25 Hester Street",
      postal_code: "L9A 2N3"
    },
    number: "905-974-9848",
    website: "https://www.hamilton.ca/coronavirus/assessment-centres",
    days: everyday,
    hours: [
      { time: "10:00 - 11:00 AM", is_taken: false },
      { time: "11:00 - 12:00 PM", is_taken: false },
      { time: "1:00 - 2:00 PM", is_taken: false },
      { time: "6:00 - 7:00 PM", is_taken: false }
    ]
  },
  {
    name: "Hamilton Health Sciences",
    location: {
      city: "Hamilton",
      address: "690 Main Street West",
      postal_code: "L8S 1A4"
    },
    number: "905-974-9848",
    website: "https://www.hamilton.ca/coronavirus/assessment-centres",
    days: workdays,
    hours: [
      { time: "7:00 - 8:00 AM", is_taken: false },
      { time: "8:00 - 9:00 AM", is_taken: false },
      { time: "1:00 - 2:00 PM", is_taken: false },
      { time: "2:00 - 3:00 PM", is_taken: false }
    ]
  },
  {
    name: "Brewer Park Arena",
    location: {
      city: "Ottawa",
      address: "151 Brewer Way",
      postal_code: "K1S 5T1"
    },
    number: "",
    website: "https://www.ottawapublichealth.ca/en/public-health-topics/novel-coronavirus.aspx",
    days: everyday,
    hours: [
      { time: "7:00 - 8:00 AM", is_taken: false },
      { time: "8:00 - 9:00 AM", is_taken: false },
      { time: "1:00 - 2:00 PM", is_taken: false },
      { time: "2:00 - 3:00 PM", is_taken: false }
    ]
  },
  {
    name: "Queensway Carlton Hospital",
    location: {
      city: "Ottawa",
      address: "595 Moodie Drive",
      postal_code: "K2H 8A8"
    },
    number: "",
    website: "https://www.ottawapublichealth.ca/en/public-health-topics/novel-coronavirus.aspx",
    days: workdays,
    hours: [
      { time: "9:00 - 10:00 AM", is_taken: false },
      { time: "10:00 - 11:00 AM", is_taken: false },
      { time: "3:00 - 4:00 PM", is_taken: false },
      { time: "4:00 - 5:00 PM", is_taken: false }
    ]
  },
  {
    name: "NEOMO Medical",
    location: {
      city: "Sudbury",
      address: "885 Prete Street",
      postal_code: "P3E 3X9"
    },
    number: "705-671-7373",
    website: "https://www.hsnsudbury.ca/portalen/Patients-and-Visitors/COVID-19/COVID-19-Assessment-Centre",
    days: everyday,
    hours: [
      { time: "9:00 - 10:00 AM", is_taken: false },
      { time: "10:00 - 11:00 AM", is_taken: false },
      { time: "6:00 - 7:00 PM", is_taken: false },
      { time: "8:00 - 9:00 PM", is_taken: false }
    ]
  },
  {
    name: "Primacy Medical Centre",
    location: {
      city: "Sudbury",
      address: "1485 Lasalle Boulevard",
      postal_code: "P3A 1Z8"
    },
    number: "705-671-7373",
    website: "https://www.hsnsudbury.ca/portalen/Patients-and-Visitors/COVID-19/COVID-19-Assessment-Centre",
    days: everyday,
    hours: [
      { time: "6:00 - 7:00 AM", is_taken: false },
      { time: "7:00 - 8:00 AM", is_taken: false },
      { time: "1:00 - 2:00 PM", is_taken: false },
      { time: "4:00 - 5:00 PM", is_taken: false }
    ]
  },
  {
    name: "St. Mary's General Hospital - Bathurst Site",
    location: {
      city: "Waterloo",
      address: "50 Bathurst Drive, Unit 1",
      postal_code: "N2V 2C5"
    },
    number: "519-885-9517",
    website: "https://www.smgh.ca/covid-19-testing-available-for-k-w-residents-with-symptoms-starting-may-16",
    days: everyday,
    hours: [
      { time: "6:00 - 7:00 AM", is_taken: false },
      { time: "7:00 - 8:00 AM", is_taken: false },
      { time: "8:00 - 9:00 AM", is_taken: false },
      { time: "9:00 - 10:00 AM", is_taken: false }
    ]
  }
]
