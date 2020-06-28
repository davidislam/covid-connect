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

const variant1 = [
  { time: "9:00 - 10:00 AM", is_taken: false },
  { time: "11:00 - 12:00 AM", is_taken: false },
  { time: "1:00 - 2:00 PM", is_taken: false },
  { time: "2:00 - 3:00 PM", is_taken: false }
]

const variant2 = [
  { time: "8:00 - 9:00 AM", is_taken: false },
  { time: "9:00 - 10:00 AM", is_taken: false },
  { time: "10:00 - 11:00 AM", is_taken: false },
  { time: "11:00 - 12:00 PM", is_taken: false }
]

const variant3 = [
  { time: "5:00 - 6:00 PM", is_taken: false },
  { time: "6:00 - 7:00 PM", is_taken: false },
  { time: "8:00 - 9:00 PM", is_taken: false },
  { time: "10:00 - 11:00 PM", is_taken: false }
]

const CENTRES = [
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
    hours: variant1
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
    hours: variant3
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
    hours: variant2
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
    hours: variant1
  }
]

export default CENTRES;