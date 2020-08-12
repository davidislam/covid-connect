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

  // filterCentres() {
  //   if (!this.props.location) {
  //     console.log("location is undefined");
  //     return;
  //   }
  //   let { selected_date, selected_city } = this.props.location.state;
  //   const day = getDay(selected_date);
  //   const filteredCentres = CENTRES.filter(c => {
  //     return c.hours[day].length !== 0 && c.location.city === selected_city;
  //   })
  //   this.setState({
  //     centres: filteredCentres
  //   })
  // }

  render() {
    const { selected_date } = this.props.location.state;
    return (
      <div className='centres'>
        {/* <h3>COVID-19 assessment centres in {selected_city} for {selected_date.toLocaleDateString()}</h3> */}
        <h3>{this.state.message}</h3>
        {/* {this.state.centres.length !== 0 ?
          <CentreList
            centres={this.state.centres}
            addAppt={(appt) => this.props.addAppt(appt)}
            formattedDate={formattedDate(selected_date)}
            day={this.day}
            isLoggedIn={this.props.isLoggedIn} /> :
          <h3>No centres found</h3>} */}
        <CentreList
          centres={this.state.centres}
          addAppt={(appt) => this.props.addAppt(appt)}
          formattedDate={formattedDate(selected_date)}
          day={getDay(selected_date)}
          isLoggedIn={this.props.isLoggedIn} />
      </div>
    );
  }
}

export default AssessmentCentres;