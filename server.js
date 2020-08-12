'use strict';
const log = console.log;
const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { User } = require("./models/user");
const { Centre } = require('./models/centre');
const { Appointment } = require('./models/appointment');

const { ObjectID } = require('mongodb');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

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

// A route to login and create a session
app.post("/users/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Use the static method on the User model to find a user
  // by their username and password
  User.findByUsernamePassword(username, password)
    .then(user => {
      // Add the user's id to the session cookie.
      // We can check later if this exists to ensure we are logged in.
      req.session.user = user._id;
      req.session.username = user.username;
      res.send({ currentUser: user.username });
    })
    .catch(error => {
      if (isMongoError(error)) {
        res.status(500).send();
      } else {
        res.status(400).send()
      }
    });
});

// A route to logout a user
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

// A route to check if a user is logged in on the session cookie
app.get("/users/check-session", (req, res) => {
  if (req.session.user) {
    res.send({ currentUser: req.session.username });
  } else {
    res.status(401).send();
  }
});

/*********************************************************/

/*** User / API Routes below ************************************/

// POST create a new user
app.post("/users", mongoChecker, (req, res) => {
  const user = new User(req.body);

  user.save().then(
    user => { res.send(user) },
    error => {
      if (isMongoError(error)) {
        res.status(500).send('Internal server error');
      } else {
        log(error);
        res.status(400).send('Bad Request');
      }
    }
  )
})

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user).then((user) => {
      if (!user) {
        return Promise.reject()
      } else {
        req.user = user
        next()
      }
    }).catch((error) => {
      res.status(401).send("Unauthorized")
    })
  } else {
    res.status(401).send("Unauthorized")
  }
}

// GET get all users
app.get("/users", mongoChecker, (req, res) => {
  User.find().then(
    users => { res.send(users) },
    error => { res.status(500).send(error) }
  )
})

// GET by ID
app.get("/users/:id", mongoChecker, (req, res) => {
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

// a PUT route for replacing an *entire* resource.
// The body should contain *all* of the required fields of the resource.
app.put('/users/:id', mongoChecker, authenticate, (req, res) => {
  const id = req.params.id

  if (!ObjectID.isValid(id)) {
    res.status(404).send('Resource not found')
    return;  // so that we don't run the rest of the handler.
  }

  // Replace the user by its id using req.body
  User.findOneAndReplace({ _id: id }, req.body, { new: true, useFindAndModify: false, timestamps: false })
    .then((user) => {
      if (!user) {
        res.status(404).send()
      } else {
        res.send(user)
      }
    })
    .catch((error) => {
      if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
        res.status(500).send('Internal server error')
      } else {
        log(error)
        res.status(400).send('Bad Request') // bad request for changing the user.
      }
    })
})

/*** Centre API Routes below ************************************/

// a POST route to *create* an assessment centre
app.post('/centres', mongoChecker, authenticate, (req, res) => {
  // log(req.body);
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

// Used to batch insert centres
app.post('/admin/centres', mongoChecker, authenticate, (req, res) => {
  Centre.insertMany(req.body)
    .then(result => res.send(result))
    .catch(error => {
      if (isMongoError(error)) {
        res.status(500).send('Internal server error')
      } else {
        log(error);
        res.status(400).send('Bad Request');
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

// a GET route to get a centre by its id.
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

// a DELETE route to remove a centre by its id.
app.delete('/centres/:id', mongoChecker, authenticate, (req, res) => {
  const id = req.params.id

  // Delete a centre by its id
  Centre.findOneAndDelete({ _id: id }).then((centre) => {
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

// a PUT route for replacing an *entire* resource.
//  The body should contain *all* of the required fields of the resource.
// Maybe less desirable than a patch? 
app.put('/centres/:id', mongoChecker, authenticate, (req, res) => {
  const id = req.params.id

  if (!ObjectID.isValid(id)) {
    res.status(404).send('Resource not found')
    return;  // so that we don't run the rest of the handler.
  }

  // Replace the centre by its id using req.body
  Centre.findOneAndReplace({ _id: id }, req.body, { new: true, useFindAndModify: false })
    .then((centre) => {
      if (!centre) {
        res.status(404).send()
      } else {
        res.send(centre)
      }
    })
    .catch((error) => {
      if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
        res.status(500).send('Internal server error')
      } else {
        log(error)
        res.status(400).send('Bad Request') // bad request for changing the centre.
      }
    })
})

/* GET a list of all unique city names from centres data */
app.get('/city', mongoChecker, (req, res) => {
  Centre.distinct('location.city')
    .then(result => {
      res.send(result.sort());
    })
    .catch(err => {
      log(err);
      res.status(500).send("Internal Server Error");
    })
})

// A PATCH route to toggle a timeslot's <isTaken> value
app.patch('/centres/:id/:day/:tid', mongoChecker, (req, res) => {
  // log(req.params);
  const id = req.params.id;
  const day = req.params.day;
  const tid = req.params.tid;

  if (!ObjectID.isValid(id) || !ObjectID.isValid(tid)) {
    res.status(404).send()
    return;  // so that we don't run the rest of the handler.
  }

  Centre.findById(id).then(centre => {
    if (!centre) {
      res.status(404).send("Centre not found");
    } else {
      const ts = centre.hours[day].id(tid);
      if (!ts) {
        res.status(404).send("Timeslot not found");
      } else {
        ts.isTaken = !ts.isTaken;
        centre.save().then(c => {
          res.send({ "timeslot": ts, "centre": c })
        }).catch(error => {
          log(error);
          res.status(500).send('Internal Server Error');
        })
      }
    }
  }).catch(error => {
    log(error);
    res.status(500).send('Internal Server Error');
  })
})

/*** Appointment API Routes below ************************************/

// A GET route to get all appointments for a user
app.get('/appointments', mongoChecker, authenticate, (req, res) => {
  Appointment.find({
    creator: req.user._id
  }).then(appts => {
    res.send(appts);
  }).catch(error => {
    log(error);
    res.status(500).send('Internal server error');
  })
})

// A GET route to get all appointments in the collection. Useful for an admin.
app.get('/admin/appointments', mongoChecker, authenticate, (req, res) => {
  Appointment.find({
  }).then(appts => {
    res.send(appts);
  }).catch(error => {
    log(error);
    res.status(500).send('Internal server error');
  })
})

// a GET route to get an appointment by its id for a user
app.get('/appointments/:id', mongoChecker, authenticate, (req, res) => {
  const id = req.params.id

  if (!ObjectID.isValid(id)) {
    res.status(404).send()
    return;
  }

  Appointment.findOne({ _id: id, creator: req.user._id }).then((appt) => {
    if (!appt) {
      res.status(404).send('Resource not found')
    } else {
      res.send(appt)
    }
  })
    .catch((error) => {
      log(error)
      res.status(500).send('Internal Server Error')
    })
})

// A POST route to create an appointment
app.post('/appointments', mongoChecker, authenticate, (req, res) => {
  const appt = new Appointment({
    date: req.body.date,
    time: req.body.time,
    address: req.body.address,
    creator: req.user._id,
    timeslot: req.body.timeslot,
    status: 'Pending'
  });

  appt.save().then(result => {
    res.send(result);
  }).catch(error => {
    if (isMongoError(error)) {
      res.status(500).send('Internal server error');
    } else {
      log(error);
      res.status(400).send('Bad Request');
    }
  })
})

// A DELETE route to cancel an appointment by id
app.delete('/appointments/:id', mongoChecker, authenticate, (req, res) => {
  const id = req.params.id;

  // Validate id
  if (!ObjectID.isValid(id)) {
    res.status(404).send('Resource not found')
    return;
  }

  Appointment.findOneAndDelete({ _id: id, creator: req.user._id }).then(appt => {
    if (!appt) {
      res.status(404).send();
    } else {
      res.send(appt);
    }
  })
    .catch(error => {
      log(error);
      res.status(500).send('Server error');
    })
})

// A PATCH route to update the status of an appointment
app.patch('/appointments/:id', mongoChecker, authenticate, (req, res) => {
  const id = req.params.id;

  const { status } = req.body;
  const body = { status };

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  Appointment.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(appt => {
      if (!appt) {
        res.status(404).send();
      } else {
        res.send(appt);
      }
    })
    .catch(error => {
      log(error);
      res.status(400).send();
    })
})

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
  log(`Listening on port ${port}...`)
})