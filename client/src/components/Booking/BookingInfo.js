import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DatePicker from './DatePicker';
import CitySelect from './CitySelect';
import { Link } from 'react-router-dom';
import Map from './Map';
import { handleChange } from './../../utils';
import { getCityNames } from './../../actions/centre';

import './styles.css'

class Booking extends Component {
  state = {
    date: new Date(),
    city: '',
    cities: []
  }

  componentDidMount() {
    // Make server call
    getCityNames(this);
  }

  render() {
    const { city, date, cities } = this.state;
    return (
      <div>
        {this.props.isLoggedIn ? <h1>Hi {this.props.username}!</h1> : <h1>Hi!</h1>}
        <p>Find your closest Ontario assessment centre to get a COVID-19 (coronavirus) test.</p>
        <p>All assessment centres will test you if you would like to be tested. Testing is a free service.</p>
        <p>Call the assessment centre or your <a href="http://www.health.gov.on.ca/en/common/system/services/phu/locations.aspx" target="_blank" rel="noopener noreferrer">local public health unit</a> if you have questions or cannot find a centre near you.</p>
        <Map />
        <h2>Schedule an appointment</h2>
        <DatePicker label="Choose date" value={date} onChange={(date) => this.setState({ date })} />
        <CitySelect label="City" value={city} cities={cities} onChange={(e) => handleChange(this, e)} />
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