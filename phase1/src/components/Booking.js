import React, { Component } from 'react';
import { uid } from 'react-uid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DatePicker from './DatePicker';
import { Link } from 'react-router-dom';

import './booking.css'

function CitySelect(props) {
  const { cities, onChange } = props;
  const [city, setCity] = React.useState('');

  const handleChange = (event) => {
    onChange(event);
    setCity(event.target.value);
  };

  return (
    <div>
      <FormControl className="city-select">
        <InputLabel id="city-select-label">City</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          value={city}
          name="city"
          onChange={handleChange}
          required
        >
          {cities.map(c => (
            <MenuItem key={uid(c)} value={c}>{c}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

class Booking extends Component {
  state = { date: new Date(), city: "", cities: ["Brampton", "Hamilton", "Mississauga", "Ottawa", "Sudbury", "Toronto", "Waterloo"] }

  componentDidMount() {
    // Fetch cities data from an API
  }

  onDateChange = date => {
    // console.log(date);
    this.setState({ date })
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { city, date, cities } = this.state;
    return (
      <div>
        <h1>Hi user!</h1>
        <p>Find your closest Ontario assessment centre to get a COVID-19 (coronavirus) test.</p>
        <p>All assessment centres will test you if you would like to be tested. Testing is a free service.</p>
        <p>Call the assessment centre or your <a href="http://www.health.gov.on.ca/en/common/system/services/phu/locations.aspx">local public health unit</a> if you have questions or cannot find a centre near you.</p>
        <h2>Schedule an appointment</h2>
        <DatePicker label="Choose date" onChange={this.onDateChange} />
        <CitySelect cities={cities} onChange={this.handleChange} />
        <div className="container">
          <Link to={{
            pathname: '/centres',
            state: {
              selected_date: date,
              selected_city: city
            }
          }} className="link">
            <Button variant="contained" color="primary">
              Find an assessment centre
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Booking;