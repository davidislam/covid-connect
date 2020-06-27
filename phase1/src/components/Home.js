import React, { Component } from 'react';

import yellowMark from "./FAQs/yellowMark.png";
import Popup from "./FAQs/Popup.js";


class Home extends Component {
  state = {
    selectPopup: false
  }

  togglePopup() {
    this.setState({
      selectPopup: !this.state.selectPopup
    });
  }

  render() {

    return (
      <div>
        <h1>Home</h1>

        <div>
          <button onClick={this.togglePopup.bind(this)} className="button__yellow "><img src={yellowMark} className="yellowLogo" /></button>
        </div>
        
        {this.state.selectPopup ? 
          <Popup
            text='Important Alerts'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }

      </div>
    );
  }
}

export default Home;