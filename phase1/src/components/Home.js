import React, { Component } from 'react';

import yellowMark from "./Home/yellowMark.png";
import Popup from "./Home/Popup.js";
import {Pagination} from '@material-ui/lab'; 
import FlipScreen from "./Home/FlipScreen.js";
import img1 from "./Home/covid_img1.jpg";
import img2 from "./Home/covid_img2.jpg";
import img3 from "./Home/covid_img3.jpg";

function UserGreeting(props) {
  return <h3>You are signed in as {props.username}</h3>;
}

function GuestGreeting(props) {
  return <h3>You are not signed in</h3>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting username={props.username} />;
  }
  return <GuestGreeting />;
}

function CreatePagination(props) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const collection = props.flipCollection

  return <div>
      {collection[page - 1]}

      <Pagination
        count={3} 
        variant="outlined" 
        color="primary" 
        page={page}
        onChange={handleChange}
      />
    </div>
}

class Home extends Component {
  state = {
    selectPopup: false,
    //viewScreen: 0,
    //number: 1,
  }
  

  togglePop = () => {
    this.setState({
      selectPopup: !this.state.selectPopup
    });
  }

  handlePagination = (event, value) =>{
    const total = 2 // articles - 1
    if (this.state.viewScreen === total) {
      this.setState({viewScreen: 0})
    } else {
      this.setState({viewScreen: this.state.viewScreen + 1})
    }
  }

  flipCollection = [
    <FlipScreen 
      image={img1}
      link="https://www.cbc.ca/news/canada/toronto/ontario-stage-3-reopening-prospects-covid-19-1.5632829"
      heading="Example 1" />,
    <FlipScreen 
      image={img2}
      link="https://toronto.ctvnews.ca/ontario-reports-fourth-straight-day-with-fewer-than-200-new-covid-19-cases-1.5009525"
      heading="Example 2" />,
    <FlipScreen 
      image={img3}
      link="https://www.ctvnews.ca/health/coronavirus/canadian-led-research-casts-doubt-on-accuracy-of-covid-19-antibody-tests-1.5007343"
      heading="Example 3" /> 
  ]

  render() {

    return (
      <div>
        <h1>Welcome</h1>
        <Greeting isLoggedIn={this.props.isLoggedIn} username={this.props.username} />
        <div>
          <button onClick={this.togglePop.bind(this)} className="button__yellow ">
            <img src={yellowMark} className="yellowLogo" alt='' />
          </button>
        </div>
        <div>
          <CreatePagination flipCollection={this.flipCollection}/>

          {/*{this.flipCollection[` ${this.state.number} `]}*/}

          {/*
          <p>
            {` ${this.state.number} ` }
          </p>
          */}

          {/*
          <Pagination 
            count={3} 
            variant="outlined" 
            color="primary" 
            page={page}
            onChange={this.handleChange.bind(this)}
            //onChange={this.handlePagination.bind(this)} 
            //onChange={number => this.setState({number})}
            />
          */}
        </div>


        {this.state.selectPopup ?
          <Popup
            heading="Important Alerts"
            innertext="This is the important information to know!"
            closePopup={this.togglePop.bind(this)}
          />
          : null
        }
      </div>
    );
  }
}

export default Home;