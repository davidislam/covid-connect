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

class App extends Component {

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
            <Route path="/" render={() => <div>404</div>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
