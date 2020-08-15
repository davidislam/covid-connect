import React, { Component } from 'react';
//import { Link } from "react-router-dom";
import "./styles.css";

class NewsScreen extends Component {
  render() {

    const { newsarticle } = this.props;
    const { link, image, heading }

    return (
      <div>
        <hr className="style" />
        <a href={link} className="flip_link">
          <img src={image} className="flip_image" alt='text' />
          <h3>{heading}</h3>
        </a>
        <hr className="style" />
      </div>
    );
  }
}