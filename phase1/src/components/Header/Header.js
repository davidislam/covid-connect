import React from 'react';
import { Link } from "react-router-dom";
import {Typography, AppBar,Toolbar, IconButton, makeStyles, Container,Grid} from "@material-ui/core";
import Menu from "@material-ui/icons/Menu"
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  words: {
    padding:'10px',
    color:"black",
  }
});

export default function Header() {
  const classes = useStyles();

  return (
    <div style={{background:"#3b6978"}}>
      <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">

        <Grid item xs={2}>
          <Link to="/" style={{textDecoration: 'none'}}>
            <Typography variant="h6" className={classes.words}>Home</Typography>
            </Link>
        </Grid>

        <Grid item xs={2}>
          <Link to="/booking" style={{textDecoration: 'none'}}>
            <Typography variant="h6" className={classes.words}>Booking Center</Typography>
            </Link>
        </Grid>

        <Grid item xs={2}>
          <Link to="/Screening" style={{textDecoration: 'none'}}>
            <Typography variant="h6" className={classes.words}>Screening</Typography>
            </Link>
        </Grid>

        <Grid item xs={2}>
          <Link to="/FAQs" style={{textDecoration: 'none'}}>
            <Typography variant="h6" className={classes.words}>FAQs</Typography>
            </Link>
        </Grid>

        <Grid item xs={2}>
          <Link to="/Signin" style={{textDecoration: 'none'}}>
            <Typography variant="h6" className={classes.words}>Sign In</Typography>
            </Link>
        </Grid>
      </Grid>
    </div>
  );
}
