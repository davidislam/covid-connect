import React, { Component } from 'react';

import CentreList from './CentreList';

class AssessmentCentres extends Component {
  state = {
    centres: [
      {
        name: "Humber River Hospital Assessment Centre",
        location: "2111 Finch Avenue West, Toronto, ON, M3N 1N1",
        number: "416-747-6740",
        hours: [
          "9:00 - 10:00 AM", "12:00 - 1:00 PM", "5:00 - 6:00 PM"
        ]
      },
      {
        name: "Michael Garron Hospital - Emergency Department",
        location: "825 Coxwell Avenue, Toronto, ON, M4C 3E7",
        number: "416-469-6858",
        hours: [
          "10:00 - 11:00 AM", "3:00 - 4:00 PM", "7:00 - 8:00 PM"
        ]
      },
      {
        name: "Mount Sinai Hospital",
        location: "600 University Avenue, Toronto, ON, M5G 1X5",
        number: "416-586-4800",
        hours: [
          "8:00 - 9:00 AM", "2:00 - 3:00 PM", "5:00 - 6:00 PM"
        ]
      }
    ]
  }

  render() {
    let { selected_date } = this.props.location.state;
    return (
      <div>
        <h1>Showing Assessment Centres for {selected_date}</h1>
        <CentreList centres={this.state.centres} />
      </div>
    );
  }
}

export default AssessmentCentres;