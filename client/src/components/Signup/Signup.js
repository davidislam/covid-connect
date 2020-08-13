import React, { useState } from 'react';
import {
  TextField, makeStyles, Button, InputAdornment, IconButton,
  Radio, RadioGroup, FormControl, FormControlLabel,
  Select, MenuItem, InputLabel
} from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { signup } from '../../actions/user';
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '35ch',
    },
  }
}));


export default function SignupComponent(props) {
  const classes = useStyles();

  const [value, setValue] = useState({
    password: '',
    username: '',
    email: '',
    gender: '',
    name: '',
    age: 0,
    healthCardNumber: '',
    phoneNumber: '',
    address: '',
  })
  const [showPass, setShowPass] = useState(false);

  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const populateAge = () => {
    let i = 0;
    let ageArr = [];
    while (i < 99) {
      i++;
      ageArr.push(i);
    }
    return ageArr;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(props.signup, value);
    <Redirect to='/signin' />
  }

  const ageArray = populateAge();

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        id="Username"
        label="Username"
        variant="outlined"
        onChange={() => handleChange("username")}
        required />
      <br />

      <TextField
        id="Name"
        label="Name"
        variant="outlined"
        onChange={() => handleChange("name")}
        required />
      <br />

      <FormControl>
        <RadioGroup
          name="gender"
          onChange={() => handleChange("gender")}
          row
          required>

          <FormControlLabel
            value="male"
            control={<Radio color="primary" />}
            label="male" />

          <FormControlLabel
            value="female"
            control={<Radio color="secondary" />}
            label="female" />

        </RadioGroup>
      </FormControl>
      <br />

      <FormControl variant="outlined">
        <InputLabel id="ageLabel">Age</InputLabel>
        <Select
          labelId="ageLabel"
          id="age"
          onChange={handleChange("age")}
          style={{ width: '10ch' }}>

          {ageArray.map(num =>
            <MenuItem key={num} value={num}>{num}</MenuItem>)
          }
        </Select>
      </FormControl>
      <br />

      <TextField
        id="Password"
        label="Password"
        variant="outlined"
        type={showPass ? "text" : "password"}
        value={value.password}
        onChange={handleChange("password")}
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <IconButton onClick={() => setShowPass(!showPass)} >
              {showPass ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>,
        }}
        required />
      <br />

      <TextField
        id="healthCardNum"
        label="Health Card Number (optional)"
        variant="outlined"
        onChange={() => handleChange("healthCardNumber")}
      />
      <br />

      <TextField
        id="phoneNumber"
        label="Phone Number"
        variant="outlined"
        onChange={() => handleChange("phoneNumber")}
        required
      />
      <br />

      <TextField
        id="address"
        label="Address (optional)"
        variant="outlined"
        onChange={() => handleChange("address")}
      />
      <br />

      <TextField
        id="Email"
        label="E-mail (optional)"
        variant="outlined"
        type="email"
        onChange={() => handleChange("email")}
      />
      <br />


      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>

    </form>

  );


}
