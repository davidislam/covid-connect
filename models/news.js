'use strict';

const mongoose = require('mongoose');

const NewsArticleSchema = new mongoose.Schema({
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

const NewsArticle = mongoose.model('NewsArticle', NewsArticleSchema)
module.exports = { NewsArticle }