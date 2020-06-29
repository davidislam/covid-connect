import React, {useState} from 'react';
import { Link } from "react-router-dom";
import {Typography, makeStyles,Grid} from "@material-ui/core";

const useStyles = makeStyles({
  words: {
    padding:'10px',
    color:"black",
  }
});

export default function Header() {
  const classes = useStyles();

  const [status,setStatus] = useState({
    loggedIn: false
  });

  const handleStatus = () =>{
    setStatus({loggedIn:!status.loggedIn});
  }

  return (
    <div style={{background:"#3b6978"}}>
      <Grid container spacing={2} direction="row" justify="space-around" alignItems="center">

        <Grid item>
          <Link to="/" style={{textDecoration: 'none'}}>
            <Typography variant="h6" className={classes.words}>Home</Typography>
            </Link>
        </Grid>

        <Grid item>
          <Link to="/booking" style={{textDecoration: 'none'}}>
            <Typography variant="h6" className={classes.words}>Booking Center</Typography>
            </Link>
        </Grid>

        <Grid item>
          <Link to="/Screening" style={{textDecoration: 'none'}}>
            <Typography variant="h6" className={classes.words}>Screening</Typography>
            </Link>
        </Grid>

        <Grid item>
          <Link to="/FAQs" style={{textDecoration: 'none'}}>
            <Typography variant="h6" className={classes.words}>FAQs</Typography>
            </Link>
        </Grid>

        {status.loggedIn &&
          <Grid item>
            <Link to="/Profile" style={{textDecoration: 'none'}}>
              <Typography variant="h6" className={classes.words}>Profile</Typography>
              </Link>
          </Grid>
        }

        {!status.loggedIn?(
          <Grid item>
            <Link to="/Signin" style={{textDecoration: 'none'}} onClick={()=>handleStatus()}>
              <Typography variant="h6" className={classes.words}>Sign In</Typography>
              </Link>
          </Grid>
        ):(
          <Grid item>
            <Link to="/Signin" style={{textDecoration: 'none'}} onClick={()=>handleStatus()}>
              <Typography variant="h6" className={classes.words}>Sign Out</Typography>
              </Link>
          </Grid>
        )
        }

      </Grid>
    </div>
  );
}
