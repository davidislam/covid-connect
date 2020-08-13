import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
    return (
      <Router>
        <Header loggedIn={isLoggedIn} onSignout={this.handleLogout} />
        <Switch>
          <Route
            exact path={['/', '/signin', '/signup', '/profile', '/booking', '/centres', '/screening', '/faqs']}
            render={(props, { history }) => (
              <div className="App">
                <Home history={history} app={this} />
                <Signin history={history} app={this} />
                <Signup history={history} app={this} />
                <Profile history={history} app={this} />
                <Booking history={history} app={this} />
                <Screening history={history} app={this} />
                <FAQs history={history} app={this} />
                <AssessmentCentres {...props} history={history} app={this} />
              </div>
            )}
          />
          <Route render={() => <div>404 Page Not Found</div>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
