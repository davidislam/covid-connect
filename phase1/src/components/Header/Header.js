import React, {useState} from 'react';
import { Link } from "react-router-dom";
import {Typography, makeStyles,Grid,IconButton,MenuItem,Menu} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const useStyles = makeStyles({
  words: {
    padding:'10px',
    color:"black",
  },
});

export default function Header() {
  const classes = useStyles();

  const [status,setStatus] = useState({
    loggedIn: true
  });


  const handleStatus = () =>{
    setStatus({loggedIn:!status.loggedIn});
  }




  const [anchorEl,setAnchorEl] = useState(null);

  const handleMenuClick = (event)=>{
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClosed = () =>{
    setAnchorEl(null);
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

        <Grid item>
        <IconButton edge="end">

        <AccountCircleIcon
        fontSize="large"
        onClick={handleMenuClick}/>
        </IconButton>

          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClosed}>
            {!status.loggedIn?(
              <div>
                <Link to="/Signin" style={{textDecoration: 'none'}}>
                <MenuItem className={classes.words}>Sign In</MenuItem>
                </Link>

                <Link to="/Signup" style={{textDecoration: 'none'}}>
                <MenuItem className={classes.words}>Sign Up</MenuItem>
                </Link>
              </div>

            ):(
              <div>
                <Link to="/Profile" style={{textDecoration: 'none'}}>
                <MenuItem className={classes.words}>Profile</MenuItem>
                </Link>

                <Link
                to="/Signin"
                style={{textDecoration: 'none'}}
                >
                <MenuItem
                className={classes.words}
                onClick={handleStatus}
                >Sign Out</MenuItem>
                </Link>
              </div>
            )
          }
          </Menu>
        </Grid>

      </Grid>
    </div>
  );
}
