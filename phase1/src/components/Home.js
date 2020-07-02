import React, { Component } from 'react';

import yellowMark from "./Home/yellowMark.png";
import Popup from "./Home/Popup.js";


function UserGreeting(props) {
  return <h3>You are signed in as {props.username}</h3>;
}

function GuestGreeting(props) {
  return <h3>You are not signed in</h3>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting username={props.username} />;
  }
  return <GuestGreeting />;
}

class Home extends Component {
  state = {
    selectPopup: false,
    flipScreen: 0
  }

  togglePop = () => {
    this.setState({
      selectPopup: !this.state.selectPopup
    });
  }

  toggleFlip () {
    this.setState({
      flipScreen: this.state.flipScreen + 1
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <Greeting isLoggedIn={this.props.isLoggedIn} username={this.props.username} />
        <div>
          <button onClick={this.togglePop.bind(this)} className="button__yellow ">
            <img src={yellowMark} className="yellowLogo" alt='' />
          </button>
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