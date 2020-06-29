import React, {useState} from 'react';
import {TextField,makeStyles, Button,InputAdornment,IconButton,
Radio,RadioGroup,FormControl,FormControlLabel} from "@material-ui/core"
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


export default function SignupComponent(){
  const classes = useStyles();

  const [value, setValue] = useState({
    password:'',
    username:'',
    email:'',
    gender:'',
    firstName:'',
    lastName:'',
    age:0,
    showPassword: ''
  })

  const handleShowPass = () => {
    setValue({...value, showPassword: !value.showPassword})
  };

  const handleChange = (prop)=>(event)=>{
    setValue({...value,[prop]:event.target.value});
  };

  return(
    <div>
      <form className={classes.root}>
        <TextField
        id="Username"
        label="Username"
        variant="outlined"
        onChange={()=>handleChange("username")}
        required />
        <br />

        <TextField
        id="FirstName"
        label="First Name"
        variant="outlined"
        onChange={()=>handleChange("firstName")}
        required />
        <br />

        <TextField
        id="Lastname"
        label="Last name"
        variant="outlined"
        onChange={()=>handleChange("lastName")}
        required />
        <br />

        <FormControl>
          <RadioGroup
          name="gender"
          onChange={()=>handleChange("gender")}
          row>

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


        <TextField
        id="Password"
        label="Password"
        variant="outlined"
        type={value.showPassword ? "text" : "password"}
        value = {value.password}
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
        id="Email"
        label="E-mail(optional)"
        variant="outlined"
        onChange={()=>handleChange("email")}
         />
        <br />

        <Button variant="contained" color="primary">
        Register
        </Button>

        </form>
    </div>

  );


}
