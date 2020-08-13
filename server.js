'use strict';
const log = console.log;
const path = require('path');
const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');
const { mongo } = require('mongoose');

const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.
mongoose.set('useFindAndModify', false); // for some deprecation issues

// Mongoose models
const { Centre } = require('./models/centre');
const { Appointment } = require('./models/appointment');
const { NewsArticles } = require('./models/news');

const { ObjectID } = require('mongodb');

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

// Use the <file> file to handle endpoints with /<file>
app.use('/users', users);
app.use('/centres', centres);
app.use('/appointments', appointments);


/*** Centre API Routes below ************************************/

// a POST route to *create* an assessment centre
app.post('/centres', mongoChecker, authenticateAdmin, (req, res) => {
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
app.post('/admin/centres', mongoChecker, authenticateAdmin, (req, res) => {
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
app.delete('/centres/:id', mongoChecker, authenticateAdmin, (req, res) => {
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

// A PATCH route to update a centre
app.patch('/centres/:id', mongoChecker, authenticateAdmin, (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  Centre.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(centre => {
      if (!centre) {
        res.status(404).send();
      } else {
        res.send(centre);
      }
    })
    .catch(error => {
      res.status(400).send();
    });
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
app.patch('/centres/:id/:day/:tid', mongoChecker, authenticate, (req, res) => {
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
          // res.send({ "timeslot": ts, "centre": c })
          res.send(c.hours[day]);
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

/*** NewsArticles API Routes below ************************************/

/// A GET route for getting all newsarticles information.
app.get('/newsarticles', mongoChecker, authenticateAdmin, (req, res) => {

  NewsArticle.find().then((newsarticles) => {
    res.send(newsarticles)
  })
    .catch((error) => {
      log(error)
      res.status(500).send("Internal Server Error")
    })

})

// A GET route to get a news article by its ID
app.get('/newsarticles/:id', mongoChecker, authenticateAdmin, (req, res) => {

  const id = req.params.id

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  NewsArticle.findById(id)
    .then(newsarticle => {
      if (!newsarticle) {
        res.status(404).send();
      } else {
        res.send(newsarticle);
      }
    })
    .catch(error => {
      res.status(500).send(); // server error
    });

})

// A POST route to create a news article
app.post("/newsarticles", mongoChecker, authenticateAdmin, (req, res) => {

  const newsarticle = new NewsArticle({
    link: req.body.link,
    image: req.body.image,
    heading: req.body.heading
  });

  newsarticle.save().then(
    result => {
      res.send(result);
    },
    error => {
      res.status(400).send(error)
    }
  );
});

/// a DELETE route to remove a news article by its ID
app.delete("/newsarticles/:id", mongoChecker, authenticateAdmin, (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  NewsArticle.findByIdAndRemove(id)
    .then(newsarticle => {
      if (!newsarticle) {
        res.status(404).send();
      } else {
        res.send(newsarticle);
      }
    })
    .catch(error => {
      res.status(500).send(); // server error, could not delete.
    });
});

// A PATCH route to change news article information by ID
app.patch("/newsarticles/:id", mongoChecker, authenticateAdmin, (req, res) => {
  const id = req.params.id;

  const { link, image, heading } = req.body;
  const body = { link, image, heading };

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  NewsArticle.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(newsarticle => {
      if (!newsarticle) {
        res.status(404).send();
      } else {
        res.send(newsarticle);
      }
    })
    .catch(error => {
      res.status(400).send(); // bad request for changing the student.
    });
});


/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
  log(`Listening on port ${port}...`)
})
