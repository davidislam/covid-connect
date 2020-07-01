import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header'
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Booking from './components/Booking';
import Screening from './components/Screening';
import Policies from './components/Policies';
import FAQs from './components/FAQs';
import News from './components/News';
import AssessmentCentres from './components/Centre';

class App extends Component {
  // Global state
  initState = {
    isLoggedIn: false,
    isAdmin: false,
    username: ''
  }

  state = {
    isLoggedIn: false,
    isAdmin: false,
    username: ''
  }

  handleLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  handleAdmin = () => {
    this.setState({
      isAdmin: true
    })
  }

  handleLogout = () => {
    this.setState(this.initState);
  }

  changeUsername = username => this.setState({ username });

  render() {
    return (
      <div className="App">
        <Router>
          <Header loggedIn={this.state.isLoggedIn} onSignout={this.handleLogout} />
          <Switch>
            <Route path='/' exact render={() => (
              <Home username={this.state.username} isLoggedIn={this.state.isLoggedIn} />
            )} />
            <Route path='/signin' render={() => (
              <Signin onLogin={this.handleLogin} onAdmin={this.handleAdmin} changeUsername={this.changeUsername} />
            )} />
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
