'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const TimeslotSchema = new mongoose.Schema({
  time: String,
  isTaken: Boolean
})

// Assessment centre schema
const CentreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
    unique: true
  },
  location: {
    address: {
      type: String,
      required: true,
      minlength: 5,
      trim: true
    },
    city: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    postalCode: {
      type: String,
      required: true,
      minlength: 6,
      validate: {
        validator: function (v) {
          return validator.isPostalCode(v, "CA")
        },
        message: 'Invalid postal code'
      }
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  phoneNumber: {
    type: String,
    // minlength: 10,
  },
  url: {
    type: String,
    // minlength: 1,
    // validate: {
    //   validator: validator.isURL,
    //   message: 'Invalid url'
    // }
  },
  hours: {
    monday: [TimeslotSchema],
    tuesday: [TimeslotSchema],
    wednesday: [TimeslotSchema],
    thursday: [TimeslotSchema],
    friday: [TimeslotSchema],
    saturday: [TimeslotSchema],
    sunday: [TimeslotSchema],
  },
  info: String
}, { timestamps: true });

const Centre = mongoose.model('Centre', CentreSchema);
module.exports = { Centre };

