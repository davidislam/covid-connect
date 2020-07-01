import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Typography, makeStyles, Grid, IconButton, MenuItem, Menu } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import CustomizedSnackbar from './../CustomizedSnackbar';

const useStyles = makeStyles({
  words: {
    padding: '10px',
    color: "black",
  },
});

export default function Header(props) {
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClosed = () => {
    setAnchorEl(null);
  }

  const handleSignoutClick = () => {
    props.onSignout();
    setSnackbar(true);
  }

  return (
    <div style={{ background: "#3b6978" }}>
      <Grid container spacing={2} direction="row" justify="space-around" alignItems="center">

        <Grid item>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" className={classes.words}>Home</Typography>
          </Link>
        </Grid>

        <Grid item>
          <Link to="/booking" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" className={classes.words}>Booking Center</Typography>
          </Link>
        </Grid>

        <Grid item>
          <Link to="/Screening" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" className={classes.words}>Screening</Typography>
          </Link>
        </Grid>

        <Grid item>
          <Link to="/FAQs" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" className={classes.words}>FAQs</Typography>
          </Link>
        </Grid>

        <Grid item>
          <IconButton edge="end" onClick={handleMenuClick}>

            <AccountCircleIcon
              fontSize="large"
            />
          </IconButton>

          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClosed}>
            {!props.loggedIn ? (
              <div>
                <Link to="/Signin" style={{ textDecoration: 'none' }}>
                  <MenuItem className={classes.words}>Sign In</MenuItem>
                </Link>

                <Link to="/Signup" style={{ textDecoration: 'none' }}>
                  <MenuItem className={classes.words}>Sign Up</MenuItem>
                </Link>
              </div>

            ) : (
                <div>
                  <Link to="/Profile" style={{ textDecoration: 'none' }}>
                    <MenuItem className={classes.words}>Profile</MenuItem>
                  </Link>

                  <Link
                    to="/"
                    style={{ textDecoration: 'none' }}
                  >
                    <MenuItem
                      className={classes.words}
                      onClick={handleSignoutClick}
                    >Sign Out</MenuItem>
                  </Link>
                </div>
              )
            }
          </Menu>
        </Grid>

      </Grid>
      <CustomizedSnackbar message='Signed out successfully' severity='success' open={snackbar} toggleSnackbar={() => setSnackbar(false)} />
    </div>
  );
}
