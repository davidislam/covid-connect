'use strict';
const log = console.log;
const path = require('path');

const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { User } = require("./models/user");

const { ObjectID } = require('mongodb');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

/*** Session Handling ************************************/

// Session cookie
app.use(
  session({
      secret: "oursecret",
      resave: false,
      saveUninitialized: false,
      cookie: {
          expires: 60000,
          httpOnly: true
      }
  })
);

// Login
app.post("/users/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  log(email, password);

  User.findByEmailPassword(email, password)
      .then(user => {
          // Add user ID
          req.session.user = user._id;
          req.session.email = user.email;
          res.send({ currentUser: user.email });
      })
      .catch(error => {
          res.status(400).send()
      });
});

// Logout
app.get("/users/logout", (req, res) => {
  // Remove the session
  req.session.destroy(error => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.send()
      }
  });
});

// Check status
app.get("/users/check-session", (req, res) => {
  if (req.session.user) {
      res.send({ currentUser: req.session.email });
  } else {
      res.status(401).send();
  }
});

/*********************************************************/

/*** API Routes below ************************************/




/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
  log(`Listening on port ${port}...`)
})