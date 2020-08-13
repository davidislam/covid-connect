import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Typography, makeStyles, Grid, IconButton, MenuItem, Menu } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CustomizedSnackbar from './../CustomizedSnackbar';
import { logout } from '../../actions/user';


const useStyles = makeStyles({
  words: {
    //padding: '10px',
    color: "white",
    alignItems: "centre"
  },
  wordsExpanded: {
    color: "black"
  },
  linkStyle: {
    textDecoration: 'none'
  },
  divStyle: {
    background: "#204051"
  },
  iconStyle: {
    color: "white"
  }
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
    logout(props.app);
    setSnackbar(true);
  }

  return (
    <div className={classes.divStyle}>
      <Grid container spacing={0} direction="row" justify="space-around" alignItems="center" >

        <Grid item>
          <Link to="/" className={classes.linkStyle}>
            <Typography variant="h6" className={classes.words}>Home</Typography>
          </Link>
        </Grid>

        <Grid item>
          <Link to="/booking" className={classes.linkStyle}>
            <Typography variant="h6" className={classes.words}>Booking Center</Typography>
          </Link>
        </Grid>

        <Grid item>
          <Link to="/screening" className={classes.linkStyle}>
            <Typography variant="h6" className={classes.words}>Screening</Typography>
          </Link>
        </Grid>

        <Grid item>
          <Link to="/faqs" className={classes.linkStyle}>
            <Typography variant="h6" className={classes.words}>FAQs</Typography>
          </Link>
        </Grid>

        <Grid item>
          <IconButton edge="end" className={classes.iconStyle} onClick={handleMenuClick}>

            <AccountCircleIcon
              fontSize="large"
            />
          </IconButton>

          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClosed}>
            {!props.app.currentUser ? (
              <div>
                <Link to="/signin" className={classes.linkStyle}>
                  <MenuItem className={classes.wordsExpanded}>Sign In</MenuItem>
                </Link>

                <Link to="/signup" className={classes.linkStyle}>
                  <MenuItem className={classes.wordsExpanded}>Sign Up</MenuItem>
                </Link>
              </div>

            ) : (
                <div>
                  <Link to="/profile" className={classes.linkStyle}>
                    <MenuItem className={classes.wordsExpanded}>Profile</MenuItem>
                  </Link>

                  <Link
                    to="/"
                    className={classes.linkStyle}
                  >
                    <MenuItem
                      className={classes.wordsExpanded}
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
