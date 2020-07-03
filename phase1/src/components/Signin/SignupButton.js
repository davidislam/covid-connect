import React from 'react';
import { Link } from "react-router-dom";
import {Button, makeStyles} from "@material-ui/core"


const useStyles = makeStyles({
  linkStyle:{
    textDecoration: 'none'
  }
});

export default function SignupButton(){
  const classes = useStyles();
   return(
     <div>
     <br />
     <Link to="/Signup/index.js" className={classes.linkStyle}>
       <Button variant="contained">
       Don't have an account? Sign up for FREE!
       </Button>
     </Link>
     </div>
  );
}
