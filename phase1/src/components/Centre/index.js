import React, { Component } from 'react';

import CentreList from './CentreList';
import CENTRES from './data';

class AssessmentCentres extends Component {
  state = {
    centres: []
  }

  componentDidMount() {
    // Fetch centres data
    this.filterCentres();
  }

  filterCentres() {
    let { selected_date, selected_city } = this.props.location.state;
    const day = days[selected_date.getDay()].toLowerCase();
    const filteredCentres = CENTRES.filter(c => {
      return c.days[day] && c.location.city === selected_city;
    })
    this.setState({
      centres: filteredCentres
    })
  }

  render() {
    if (!this.props.location) {
      return;
    }
    let { selected_date, selected_city } = this.props.location.state;

    return (
      <div>
        <h1>COVID-19 assessment centres in {selected_city} for {selected_date.toLocaleDateString()}</h1>
        {this.state.centres.length !== 0 ? <CentreList centres={this.state.centres} /> : <h3>No centres found</h3>}
      </div>
    );
  }
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default AssessmentCentres;