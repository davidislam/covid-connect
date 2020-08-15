import React, { Component } from 'react';
import { TextValidator } from 'react-material-ui-form-validator';


export default class CentreInfo extends Component {
  render() {
    const { name, city, address, postalCode, number, url } = this.props.comp.state;
    const { onChange } = this.props;
    const requiredMsg = "this field is required";
    return (
      <div style={inputStyle}>
        <TextValidator
          label="Name"
          name="name"
          value={name}
          onChange={onChange}
          validators={['required', 'minStringLength:5']}
          errorMessages={[requiredMsg, 'name must be at least five characters']}
        />
        <TextValidator
          label="Address"
          name="address"
          value={address}
          onChange={onChange}
          validators={['required', 'minStringLength:5']}
          errorMessages={[requiredMsg, 'address must be at least five characters']}
        />
        <TextValidator
          label="Postal code"
          name="postalCode"
          value={postalCode}
          onChange={onChange}
          validators={['required', 'matchRegexp:^[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]$']}
          errorMessages={[requiredMsg, 'invalid postal code']}
        />
        <TextValidator
          label="City"
          name="city"
          value={city}
          onChange={onChange}
          validators={['required']}
          errorMessages={[requiredMsg]}
        />
        <TextValidator
          label="Phone number"
          name="number"
          value={number}
          onChange={onChange}
        />
        <TextValidator
          label="Website url"
          name="url"
          type="url"
          value={url}
          onChange={onChange}
        />
      </div>
    )
  }
}

const inputStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-evenly",
  marginBottom: "30px"
};

