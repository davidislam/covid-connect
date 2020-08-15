import React, { useState } from 'react';
import { TextField, makeStyles, Button, InputAdornment, IconButton } from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//import appointment from '../../../../models/appointment';
import { updateLoginForm, login } from "../../actions/user";


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '35ch',
    },
  }
}));

export default function SigninComponent(props) {
  const classes = useStyles();

  const [value, setValue] = useState({
    password: '',
    username: '',
  })
  const [showPass, setShowPass] = useState(false);

  // const handleChange = (prop) => (event) => {
  //   setValue({ ...value, [prop]: event.target.value });
  // };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   login(value, props.app, props.signin);
  // }

  return (
    <div>
      <form className={classes.root} onSubmit={() => login(this, props.app)}>
        <TextField
          id="Username"
          label="Username"
          variant="outlined"
          value={value.username}
          onChange={e => updateLoginForm(this, e.target)}
          required />
          
        <br />

        <TextField
          id="Password"
          label="Password"
          variant="outlined"
          type={showPass ? "text" : "password"}
          value={value.password}
          onChange={e => updateLoginForm(this, e.target)}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton onClick={() => setShowPass(!showPass)} >
                {showPass ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>,
          }}
          required />
        <br /> 
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
          //onClick={() => login(this, app)} {/* C */}
          > 
          Sign in
        </Button>
      </form>
    </div>
  );
}
