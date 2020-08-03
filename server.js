'use strict';
const log = console.log;
const path = require('path');

const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.

const { ObjectID } = require('mongodb');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

/*********************************************************/

/*** API Routes below ************************************/





/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
  log(`Listening on port ${port}...`)
})