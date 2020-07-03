import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./styles.css";

export default class FlipScreen extends Component {
  render() {
    return (
        //<div className="flip">
            <div className="flip_inner">
                <img src={this.props.image} className="flip_image" />
                <a href={this.props.link}>
                    <h3>{this.props.heading}</h3>
                </a>
            </div>
        //</div>
    );
  }
}