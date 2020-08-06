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
  // Create a new centre using the Centre mongoose model
  const centre = new Centre(req.body);

  // Save centre to the database
  centre.save().then((result) => {
    res.send(result)
  }).catch((error) => {
    if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
      res.status(500).send('Internal server error')
    } else {
      log(error) // log server error to the console, not to the client.
      res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
    }
  })
})

// a GET route to get all centres
app.get('/centres', mongoChecker, (req, res) => {
  Centre.find({}).then((centres) => {
    res.send(centres);
  })
    .catch((error) => {
      log(error)
      res.status(500).send("Internal Server Error")
    })
})

// a GET route to get a centre by their id.
app.get('/centres/:id', mongoChecker, (req, res) => {
  const id = req.params.id

  if (!ObjectID.isValid(id)) {
    res.status(404).send()  // if invalid id, definitely can't find resource, 404.
    return;  // so that we don't run the rest of the handler.
  }

  // If id valid, findById
  Centre.findOne({ _id: id }).then((centre) => {
    if (!centre) {
      res.status(404).send('Resource not found')  // could not find this centre
    } else {
      res.send(centre)
    }
  })
    .catch((error) => {
      log(error)
      res.status(500).send('Internal Server Error')  // server error
    })

})

// a GET route to get a list of centres by city.
app.get('/centres/city/:city', mongoChecker, (req, res) => {
  const city = req.params.city
  // log(city);

  Centre.find({ 'location.city': city }).then((centres) => {
    res.send(centres)
  })
    .catch((error) => {
      log(error)
      res.status(500).send('Internal Server Error')  // server error
    })
})

// a DELETE route to remove a centre by its name.
app.delete('/centres/:name', mongoChecker, (req, res) => {
  const name = req.params.name

  // Delete a centre by its name
  Centre.findOneAndDelete({ name }).then((centre) => {
    if (!centre) {
      res.status(404).send()
    } else {
      res.send(centre)
    }
  })
    .catch((error) => {
      log(error)
      res.status(500).send() // server error, could not delete.
    })
})


/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
  log(`Listening on port ${port}...`)
})