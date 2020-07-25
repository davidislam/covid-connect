import React, { useState } from 'react';
import { TextField, makeStyles, Button, InputAdornment, IconButton } from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CustomizedSnackbar from './../CustomizedSnackbar';

import { useHistory } from 'react-router-dom';


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
  let history = useHistory()

  const [value, setValue] = useState({
    password: '',
    showPassword: false,
    username: '',
    showSnackbar: false,
    message: '',
    severity: ''
  })

  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const handleShowPass = () => {
    setValue({ ...value, showPassword: !value.showPassword })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // code below requires server call
    if (value.username === 'user' && value.password === 'user') {
      helper();
    } else if (value.username === 'admin' && value.password === 'admin') {
      props.onAdmin();
      helper();
    } else {
      setValue({ ...value, showSnackbar: true, message: "Incorrect username/password", severity: 'error' })
    }
  }

  const helper = () => {
    props.onLogin();
    props.changeUsername(value.username);
    // setValue({ ...value, showSnackbar: true, message: "Logged in successfully as " + value.username, severity: 'success' })
    history.push('/');
    // alert("Logged in successfully as " + value.username);
  }

  const toggleSnackbar = () => setValue({ ...value, showSnackbar: !value.showSnackbar });

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          id="Username"
          label="Username"
          variant="outlined"
          value={value.username}
          onChange={handleChange("username")}
          required />
        <br />
        <TextField
          id="Password"
          label="Password"
          variant="outlined"
          type={value.showPassword ? "text" : "password"}
          value={value.password}
          onChange={handleChange("password")}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton onClick={() => handleShowPass()} >
                {value.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>,
          }}
          required />
        <br />
        <Button variant="contained" color="primary" type="submit">
          Sign in
        </Button>
        <CustomizedSnackbar message={value.message} severity={value.severity} open={value.showSnackbar} toggleSnackbar={toggleSnackbar} />
      </form>
    </div>
  );
}
