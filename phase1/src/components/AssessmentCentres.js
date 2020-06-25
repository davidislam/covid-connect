import React, { Component } from 'react';

import CentreList from './CentreList';

class AssessmentCentres extends Component {
  state = {
    centres: [
      {
        name: "Humber River Hospital Assessment Centre",
        location: "2111 Finch Avenue West, Toronto, ON, M3N 1N1",
        number: "416-747-6740"
      }, {
        name: "Michael Garron Hospital - Emergency Department",
        location: "825 Coxwell Avenue, Toronto, ON, M4C 3E7",
        number: "416-469-6858"
      }, {
        name: "Mount Sinai Hospital",
        location: "600 University Avenue, Toronto, ON, M5G 1X5",
        number: "416-586-4800"
      }
    ]
  }
  render() {
    return (
      <div>
        <h1>Showing Assessment Centres for selected date</h1>
        <CentreList centres={this.state.centres} />
      </div>

    );
  }
}

export default AssessmentCentres;