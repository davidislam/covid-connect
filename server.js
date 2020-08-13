'use strict';
const log = console.log;

const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.
mongoose.set('useFindAndModify', false); // for some deprecation issues

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express-session for managing user sessions
const session = require("express-session");

const cors = require('cors');
app.use(cors());

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log('Issue with mongoose connection')
    res.status(500).send('Internal server error')
    return;
  } else {
    next()
  }
}
app.use(mongoChecker());

// Session cookie
app.use(
  session({
    secret: "oursecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      // maxAge: 3600000,
      httpOnly: true
    }
  })
);

// Routes
const users = require('./routes/users');
const centres = require('./routes/centres');
const appointments = require('./routes/appointments');
const newsarticles = require('./routes/newsarticles');

app.use('/users', users);
app.use('/centres', centres);
app.use('/appointments', appointments);
app.use('/newsarticles', newsarticles);

// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
  log(`Listening on port ${port}...`)
})
