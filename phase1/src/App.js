import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import { addAppointment, deleteAppointment } from './actions/app';

import Header from './components/Header'
import Home from './components/Home/index';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Booking from './components/Booking';
import Screening from './components/Screening/index';
import FAQs from './components/FAQs';
import AssessmentCentres from './components/Centre';

class App extends Component {
  // Global state
  initState = {
    isLoggedIn: false,
    isAdmin: false,
    username: '',
    appointments: [],
  }

  state = {
    isLoggedIn: true,
    isAdmin: true,
    username: 'admin',
    appointments: [],
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
    const { isLoggedIn, isAdmin, username, appointments } = this.state;
    return (
      <div className="App">
        <Router>
          <Header loggedIn={isLoggedIn} onSignout={this.handleLogout} />
          <Switch>
            <Route path='/' exact render={() => (
              <Home username={username} isLoggedIn={isLoggedIn} />
            )} />
            <Route path='/signin' render={() => (
              <Signin onLogin={this.handleLogin} onAdmin={this.handleAdmin} changeUsername={this.changeUsername} />
            )} />
            <Route path='/signup' component={Signup} />
            <Route path='/profile' render={() => (
              <Profile
                username={username}
                appointments={appointments}
                isAdmin={isAdmin}
                deleteAppt={appt => deleteAppointment(appt, this)}
                changeUsername={this.changeUsername}
              />
            )} />
            <Route path='/booking' render={() => (
              <Booking isLoggedIn={isLoggedIn}
                username={username}
                isAdmin={isAdmin}
              />
            )} />
            <Route path='/screening' component={Screening} />
            <Route path='/faqs' component={FAQs} />
            <Route path='/centres' render={(props) => (
              <AssessmentCentres {...props} addAppt={(appt) => addAppointment(appt, this)} />
            )} />
            <Route path="/" render={() => <div>404</div>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
