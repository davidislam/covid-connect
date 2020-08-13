import React, { useState } from 'react';
import { TextField, makeStyles, Button, InputAdornment, IconButton } from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { login } from '../../actions/user';


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
    showPassword: false,
    username: '',
  })

  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const handleShowPass = () => {
    setValue({ ...value, showPassword: !value.showPassword })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username: value.username, password: value.password }, props.app, props.signin);
  }

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
      </form>
    </div>
  );
}
