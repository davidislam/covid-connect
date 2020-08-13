'use strict';

const mongoose = require('mongoose');

const NewsArticlesSchema = new mongoose.Schema({

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

const NewsArticles  = mongoose.model('NewsArticles', NewsArticlesSchema)
module.exports = { NewsArticles }