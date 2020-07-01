import React, { Component } from 'react';
import "./styles.css";

export default class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_screen">
          <h1>{this.props.heading}</h1>
          <p>{this.props.innertext}</p>
          <button onClick={this.props.closePopup}>RETURN</button>
        </div>
      </div>
    );
  }
}