import React, { Component } from 'react';

import QuestionOne from './QuestionOne'
import QuestionTwo from './QuestionTwo'
import QuestionThree from './QuestionThree'
import Introduction from './Introduction'
import Emergency from './Emergency'
import NeedTest from './NeedTest'
import NotNeedTest from './NotNeedTest'

class Screening extends Component {
  constructor(props) {
    super(props);
    this.state = {started: false, numAnswered: 0, q1: null, q2: 0, q3: null}
  }

  startScreen = () => {
    this.setState({started: true});
  }

  nextQuestion = () => {
    this.setState({numAnswered: this.state.numAnswered + 1})
  }

 restart = () => {
    this.setState({started: false, numAnswered: 0, q1: null, q2: 0, q3: null})
  }

  handleChange = (event) => {
    if (this.state.numAnswered === 0) {
      this.setState({q1: event.target.value})
    } else if (this.state.numAnswered === 1) {
      if (event.target.checked === true){
        this.setState({q2: this.state.q2 + 1});
      } else if (event.target.checked === false){
        this.setState({q2: this.state.q2 - 1})
      }
    } else if (this.state.numAnswered === 2) {
      this.setState({q3: event.target.value});
    }
  }

  render() {
    if (!this.state.started) {
      return (
        <Introduction startScreen={this.startScreen}/>
      );
    } else if (this.state.numAnswered === 0) {
      return (
        <QuestionOne restart={this.restart} nextQuestion={this.nextQuestion} handleChange={this.handleChange}/>
      );
    } else if (this.state.q1 === "Yes") {
      return (
        <Emergency restart={this.restart}/>
      )
    } else if (this.state.numAnswered === 1) {
      return (
        <QuestionTwo handleChange={this.handleChange} restart={this.restart} nextQuestion={this.nextQuestion}/>
      )
    } else if (this.state.numAnswered === 2) {
      return (
        <QuestionThree handleChange={this.handleChange} restart={this.restart} nextQuestion={this.nextQuestion}/>
      );
    } else if (this.state.numAnswered === 3 && this.state.q2 === 0) {
      return (
        <NeedTest restart={this.restart}/>
        )
    } else {
      return (
        <NotNeedTest restart={this.restart}/>
        )
    }
  }
}

export default Screening;