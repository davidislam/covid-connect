import React, {useState} from 'react';
import { Link } from "react-router-dom";
import {Button} from "@material-ui/core"


export default function SignupButton(){
   return(
     <div>
     <br />
     <Link to="/Signup" style={{textDecoration: 'none'}}>
       <Button variant="contained">
       Don't have an account? Register here
       </Button>
     </Link>
     </div>
  );
}
