import React, { Component } from 'react';

class Screening extends Component {
  state = {}
  render() {
    return (
      <div>
        <h1>COVID-19 Screening Tool</h1>
        <p>This tool can help you understand what to do next about COVID-19. Let’s all look out for each other by knowing our status, trying not to infect others, and reserving care for those in need.</p>
        <input type="button" onclick="question()" value="Start Screening" />
      </div>
    );
  }
}

export default Screening;
