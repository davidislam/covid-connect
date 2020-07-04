import React, { useState } from 'react';
import {
  TextField, makeStyles, Button, InputAdornment, IconButton,
  Radio, RadioGroup, FormControl, FormControlLabel,
  Select, MenuItem, InputLabel
} from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '35ch',
    },
  }

}));


export default function SignupComponent() {
  const classes = useStyles();

  const [value, setValue] = useState({
    password: '',
    username: '',
    email: '',
    gender: '',
    name: '',
    age: 0,
    healthCardNum: '',
    phoneNumber: '',
    address: '',
    showPassword: ''
  })

  const handleShowPass = () => {
    setValue({ ...value, showPassword: !value.showPassword })
  };

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

  const handleClick = () => {
    // Send info to server
  }

  return (
    <div>
      <form className={classes.root}>
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

            {populateAge().map(num =>
              <MenuItem value={num}>{num}</MenuItem>)
            }
          </Select>
        </FormControl>
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

        <TextField
          id="healthCardNum"
          label="Health Card Number(optional)"
          variant="outlined"
          onChange={() => handleChange("healthCardNum")}
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
          label="Address(optional)"
          variant="outlined"
          onChange={() => handleChange("address")}
        />
        <br />

        <TextField
          id="Email"
          label="E-mail(optional)"
          variant="outlined"
          onChange={() => handleChange("email")}
        />
        <br />


        <Button variant="contained" color="primary" onClick={handleClick}>
          Register
        </Button>

      </form>
    </div>

  );


}
