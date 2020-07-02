import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./styles.css";

export default class FlipScreen extends Component {
  render() {
    return (
        <div className="flip">
            <div className="flip_inner">
                <img src={this.props.image} />
                <Link to="/" style={{ textDecoration: 'none' }}>
                   <h1>{this.props.heading}</h1>
                   <p>{this.props.innertext}</p>
                </Link>
            </div>
        </div>
    );
  }
}