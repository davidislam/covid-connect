import React, { Component } from 'react';
import { TextValidator } from 'react-material-ui-form-validator';


export default class NewsInfo extends Component {
  render() {
    //const { name, city, address, postalCode, number, url, info } = this.props.comp.state;
    const { link, image, heading } = this.props.comp.state;
    const { onChange } = this.props;
    const requiredMsg = "this field is required";
    return (
      <div style={inputStyle}>
        <TextValidator
          label="Link"
          name="link"
          value={link}
          onChange={onChange}
          validators={['required']}
          errorMessages={[requiredMsg]}
        />
        <TextValidator
          label="Image"
          name="image"
          value={image}
          onChange={onChange}
          validators={['required']}
          errorMessages={[requiredMsg]}
        />
        <TextValidator
          label="Heading"
          name="heading"
          value={heading}
          onChange={onChange}
          validators={['required']}
          errorMessages={[requiredMsg]}
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

