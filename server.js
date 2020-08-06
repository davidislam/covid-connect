'use strict';
const log = console.log;
const path = require('path');

const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { User } = require("./models/user");
const { Centre } = require('./models/centre');

const { ObjectID } = require('mongodb');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

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

/*** User / API Routes below ************************************/

// POST create new account
app.post("/signup", (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  user.save().then(
    user => { res.send(user) },
    error => { res.status(400).send(error) }
  )
})

// GET get all accounts
app.get("/users", (req, res) => {
  User.find().then(
    users => { res.send(users) },
    error => { res.status(500).send(error) }
  )
})

// GET by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id

  if (!ObjectID.isValid(id)) {
    res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    return;
  }

  User.findById(id).then(user => {
    if (!user) {
      res.status(404).send()
    } else {
      res.send(user)
    }
  }).catch(error => {
    res.status(500).send(); // server error
  });

})

/*** Centre API Routes below ************************************/

// a POST route to *create* an assessment centre
app.post('/centres', mongoChecker, (req, res) => {
  log(req.body);
  res.send("good");
  // // Create a new centre using the Centre mongoose model
  // const centre = new Centre(req.body)

  // // Save student to the database
  // student.save().then((result) => {
  // 	res.send(result)
  // }).catch((error) => {
  // 	if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
  // 		res.status(500).send('Internal server error')
  // 	} else {
  // 		log(error) // log server error to the console, not to the client.
  // 		res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
  // 	}
  // })
})





/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
  log(`Listening on port ${port}...`)
})