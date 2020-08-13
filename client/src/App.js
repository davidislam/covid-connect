import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import { readCookie } from './actions/user';

import Header from './components/Header';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Booking from './components/Booking';
import Screening from './components/Screening';
import FAQs from './components/FAQs';
import AssessmentCentres from './components/Centre';

class App extends Component {
  constructor(props) {
    super(props);
    readCookie(this);
  }

  state = {
    isAdmin: false,
    currentUser: null,
  }

  render() {
    const { isAdmin, currentUser } = this.state;
    const isLoggedIn = currentUser ? true : false;
    return (
      <Router>
        <div className="App">
          <Header app={this} isLoggedIn={isLoggedIn} />
          <Switch>
            <Route path='/' exact render={() => (
              <Home username={currentUser} isLoggedIn={isLoggedIn} />
            )} />
            <Route path='/signin'>
              {isLoggedIn ? <Redirect to='/' /> : <Signin app={this} />}
            </Route>
            <Route path='/signup'>
              {isLoggedIn ? <Redirect to='/' /> : <Signup app={this} />}
            </Route>
            <Route path='/profile'>
              {!isLoggedIn ? <Redirect to='/' /> : <Profile isAdmin={isAdmin} app={this} />}
            </Route>
            <Route path='/booking' render={() => (
              <Booking
                username={currentUser}
                isAdmin={isAdmin}
                isLoggedIn={isLoggedIn}
              />
            )} />
            <Route path='/screening' component={Screening} />
            <Route path='/faqs' component={FAQs} />
            <Route path='/centres' render={(props) => (
              <AssessmentCentres {...props}
                isLoggedIn={isLoggedIn} />
            )} />
            <Route path="/" render={() => <div>404</div>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
