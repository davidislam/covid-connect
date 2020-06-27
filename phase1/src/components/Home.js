import React, { Component } from 'react';

import yellowMark from "./FAQs/yellowMark.png";
import Popup from "./FAQs/Popup.js";


class Home extends Component {
  state = {
    selectPopup: false
  }

  togglePop = () => {
    this.setState({
      selectPopup: !this.state.selectPopup
    });
  }

  render() {

    return (
      <div>
        <h1>Home</h1>

        <div>
          <button onClick={this.togglePop.bind(this)} className="button__yellow "><img src={yellowMark} className="yellowLogo" /></button>
        </div>
        
        {this.state.selectPopup ? 
          <Popup
            heading="Important Alerts"
            innertext="This is the important information to know!"
            closePopup={this.togglePop.bind(this)}
          />
          : null
        }

      </div>
    );
  }
}

export default Home;