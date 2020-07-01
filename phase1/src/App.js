import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header'
import Home from './components/Home';
import Signin from './components/Signin/index';
import Signup from './components/Signup/index';
import Profile from './components/Profile/index';
import Booking from './components/Booking/index';
import Screening from './components/Screening';
import Policies from './components/Policies';
import FAQs from './components/FAQs';
import News from './components/News';
import AssessmentCentres from './components/Centre';

class App extends Component {
  state = {loggedIn: false}


  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            <Route path='/profile' component={Profile} />
            <Route path='/booking' component={Booking} />
            <Route path='/screening' component={Screening} />
            <Route path='/policies' component={Policies} />
            <Route path='/faqs' component={FAQs} />
            <Route path='/news' component={News} />
            <Route path='/centres' component={AssessmentCentres} />
            <Route path="/" render={() => <div>404</div>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
