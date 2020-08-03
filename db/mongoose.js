const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/CovidConnectAPI';

mongoose.connect(mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .catch((error) => {
    console.log(error);
    console.log('Error connecting to mongodb. Timeout reached.');
  })
  ;

module.exports = { mongoose } 