import React from 'react';
import { Link } from "react-router-dom";
import {Button} from "@material-ui/core"


export default function SignupButton(){
   return(
     <div>
     <br />
     <Link to="/Signup/index.js" style={{textDecoration: 'none'}}>
       <Button variant="contained">
       Don't have an account? Sign up for FREE!
       </Button>
     </Link>
     </div>
  );
}
