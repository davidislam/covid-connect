import React, { Component } from 'react';
import yellowMark from "./static/yellowMark.png";
import Popup from "./Popup.js";
import { Pagination } from '@material-ui/lab';
import FlipScreen from "./FlipScreen.js";
import img1 from "./static/covid_img1.jpg";
import img2 from "./static/covid_img2.jpg";
import img3 from "./static/covid_img3.jpg";
import { makeStyles, Grid } from '@material-ui/core';

// NEWS STUFF FOR INTEGRATION -----------------------------------------
//import { getNewsCount, getNewsArticles } from "./../../actions/news"


function UserGreeting(props) {
  return <h4 className="greetingText">You are signed in as {props.username}</h4>;
}

function GuestGreeting(props) {
  return <h4 className="greetingText">You are not signed in</h4>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting username={props.username} />;
  }
  return <GuestGreeting />;
}

function CreatePagination(props) {
  const useStyles = makeStyles(theme => ({
    paginator: {
      justifyContent: "center",
    }
  }));

  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const collection = props.flipCollection

  return <div>
    {collection[page - 1]}

    <div className='page_styles'>

      {/* FOR INTEGRATION
      <Pagination
        classes={{ ul: classes.paginator }}
        variant="outlined"
        color="primary"
        count={getNewsCount(this)}
        page={page}
        onChange={handleChange}
      />
      */}

      <Pagination
        classes={{ ul: classes.paginator }}
        variant="outlined"
        color="primary"
        count={3}
        page={page}
        onChange={handleChange}
      />

    </div>
  </div>
}

class Home extends Component {
  state = {
    selectPopup: false,
  }

  togglePop = () => {
    this.setState({
      selectPopup: !this.state.selectPopup
    });
  }

  flipCollection = [
    <FlipScreen
      image={img1}
      link="https://www.cbc.ca/news/canada/toronto/ontario-stage-3-reopening-prospects-covid-19-1.5632829"
      heading="Stage 3 of Ontario's COVID-19 reopening plan looms nearer" />,
    <FlipScreen
      image={img2}
      link="https://toronto.ctvnews.ca/ontario-reports-fourth-straight-day-with-fewer-than-200-new-covid-19-cases-1.5009525"
      heading="Ontario reports fourth straight day with fewer than 200 new COVID-19 cases" />,
    <FlipScreen
      image={img3}
      link="https://www.ctvnews.ca/health/coronavirus/canadian-led-research-casts-doubt-on-accuracy-of-covid-19-antibody-tests-1.5007343"
      heading="Canadian-led research casts doubt on accuracy of COVID-19 antibody tests" />
  ]

  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <Greeting isLoggedIn={this.props.isLoggedIn} username={this.props.username} />
        <Grid container spacing={0} direction="row" justify="center" alignItems="center" >

          <Grid item>
            <h3>News Highlights This Week:</h3>
          </Grid>

          <Grid item>
            <button onClick={this.togglePop.bind(this)} className="button__yellow ">
              <img src={yellowMark} className="yellowLogo" alt='' />
            </button>
          </Grid>

        </Grid>

        <CreatePagination flipCollection={this.flipCollection} />

        {this.state.selectPopup ?
          <Popup
            heading="Important Alerts"
            innertext="Toronto City Council has approved a temporary bylaw mandating masks in enclosed public spaces."
            moreinfolink="https://www.toronto.ca/home/covid-19/covid-19-what-you-should-do/covid-19-orders-directives-by-laws/"
            closePopup={this.togglePop.bind(this)}
          />
          : null
        }
      </div>
    );
  }
}

export default Home;