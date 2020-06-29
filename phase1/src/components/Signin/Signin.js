import React, {useState} from 'react';
import { Link } from "react-router-dom";
import {TextField,makeStyles, Button,InputAdornment,IconButton} from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles(theme => ({
  root:{
    '& > *': {
      margin: theme.spacing(2),
      width: '35ch',
    }
  }

}));

export default function SigninComponent(){
  const classes = useStyles();

  const [value, setValue] = useState({
    password: '',
    showPassword: false,
  })

  const handlePassword = (prop)=>(event)=>{
    setValue({...value,[prop]:event.target.value});
  };

  const handleShowChange = () => {
    setValue({...value, showPassword: !value.showPassword})
  };

  return(
    <div>
      <form className={classes.root}>
          <TextField
          id="Username"
          label="Username"
          variant="outlined"
          required />
          <br />


          <TextField
          id="Password"
          label="Password"
          variant="outlined"
          type={value.showPassword ? "text" : "password"}
          value = {value.password}
          onChange={handlePassword("password")}
          InputProps={{
            endAdornment: <InputAdornment position="end">
            <IconButton onClick={() => handleShowChange()} >
            {value.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            </InputAdornment>,
          }}
          required />


          <br />
          <Button variant="contained" color="primary">
          Sign in
          </Button>


      </form>
    </div>

  );
}
