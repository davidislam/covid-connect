import React, { Component } from 'react';
import "./styles.css";

class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_screen'>
            <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>Return</button>
          </div>
        </div>
      );
    }
}

export default Popup;