'use strict';

const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({

  link: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },

});

const News  = mongoose.model('News', NewsSchema)
module.exports = { News }