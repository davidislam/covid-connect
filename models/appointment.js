'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const AppointmentSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  tid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Positive', 'Negative']
  },
  cid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  day: {
    type: String,
    required: true,
    lowercase: true
  }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = { Appointment };