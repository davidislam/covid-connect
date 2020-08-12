import React, { Component } from 'react';

import CentreList from './CentreList';
import { CENTRES } from './../../data';

import './styles.css';

function formattedDate(date) {
  const monthNum = date.getMonth();
  const monthName = months[monthNum];
  return `${monthName} ${date.getDate()}, ${date.getFullYear()}`
}

function getDay(date) {
  return days[date.getDay()].toLowerCase();
}

class AssessmentCentres extends Component {
  state = {
    centres: []
  }

  componentDidMount() {
    // Fetch centres data from server
    this.filterCentres();
  }

  filterCentres() {
    if (!this.props.location) {
      console.log("location is undefined");
      return;
    }
    let { selected_date, selected_city } = this.props.location.state;
    const day = getDay(selected_date);
    const filteredCentres = CENTRES.filter(c => {
      return c.hours[day].length !== 0 && c.location.city === selected_city;
    })
    this.setState({
      centres: filteredCentres
    })
  }

  render() {
    if (!this.props.location) {
      return null;
    }
    let { selected_date } = this.props.location.state;

    return (
      <div className='centres'>
        {/* <h1>COVID-19 assessment centres in {selected_city} for {selected_date.toLocaleDateString()}</h1> */}
        {this.state.centres.length !== 0 ?
          <CentreList
            centres={this.state.centres}
            addAppt={(appt) => this.props.addAppt(appt)}
            formattedDate={formattedDate(selected_date)}
            day={getDay(selected_date)}
            isLoggedIn={this.props.isLoggedIn} /> :
          <h3>No centres found</h3>}
      </div>
    );
  }
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default AssessmentCentres;