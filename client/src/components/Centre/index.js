import React, { Component } from 'react'
import CentreList from './CentreList';
import { formattedDate, getDay, getCentresByCityForDay } from './../../actions/centre';

import './styles.css';

class AssessmentCentres extends Component {
  state = {
    centres: [],
    message: ''
  }

  componentDidMount() {
    const city = this.props.location.state.selected_city;
    const date = this.props.location.state.selected_date;
    getCentresByCityForDay(this, city, date);
  }

  render() {
    const { selected_date } = this.props.location.state;
    return (
      <div className='centres'>
        <h3>{this.state.message}</h3>
        <CentreList
          centres={this.state.centres}
          formattedDate={formattedDate(selected_date)}
          day={getDay(selected_date)}
          isLoggedIn={this.props.isLoggedIn} />
      </div>
    );
  }
}

export default AssessmentCentres;