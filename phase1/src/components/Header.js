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
            <li className='headerLinks'>Home</li>
          </Link>
          <Link to="/booking">
            <li className='headerLinks'>Center</li>
          </Link>
          <Link to="/FAQs">
            <li className='headerLinks'>FAQs</li>
          </Link>
          <Link to="/Signin">
            <li className='headerLinks'>Sign In</li>
          </Link>
          <Link to="/Screening">
            <li className='headerLinks'>COVID Screening</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Header;
