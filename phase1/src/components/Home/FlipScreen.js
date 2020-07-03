import React, { Component } from 'react';
//import { Link } from "react-router-dom";
import "./styles.css";

export default class FlipScreen extends Component {
  render() {
    return (
      <div>
        <hr class="style"/>
          <a href={this.props.link} className="flip_link">
            <img src={this.props.image} className="flip_image" />
            <h3>{this.props.heading}</h3>
          </a>
        <hr class="style"/>
      </div>
    );
  }
}