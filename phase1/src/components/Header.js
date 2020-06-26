import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './header.css'

class Header extends Component {
  state = {}
  render() {
    return (
      <nav>
        <ul className="navList">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/booking">
            <li>Center</li>
          </Link>
          <Link to="/FAQs">
            <li>FAQs</li>
          </Link>
          <Link to="/Signup">
            <li>Sign Up</li>
          </Link>
          <Link to="/Screening">
            <li>COVID Screening</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Header;
