import React, { Component } from 'react';
import Button from "@material-ui/core/Button";

import "./app.css";

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';

class FAQs extends Component {
  state = {}
  render() {
    return (
      <div>
      <h1>FAQs</h1>

      { /*
      <Link className="home__button-link center" to={"./../Queue"}>
               { /* Using the global state variable from App.js * /}
          <Button className="home__button">Go back Home {this.props.state.abc}</Button>
      </Link> 
      
      */ }

      <BrowserRouter>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/Home' render={() => 
                            (<Home state={this.state}/>)}/>
          </Switch>
      </BrowserRouter>


      </div>
      );
  }
}

export default FAQs;