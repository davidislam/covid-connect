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

app.use((req, res, next) => {
  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
    log('Issue with mongoose connection')
    res.status(500).send('Internal server error')
    return;
  } else {
    next()
  }
});

// Session cookie
app.use(
  session({
    secret: "oursecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
      httpOnly: true
    }
  })
);

// Routes
const users = require('./routes/users');
const centres = require('./routes/centres');
const appointments = require('./routes/appointments');
const newsarticles = require('./routes/newsarticles');
const images = require('./routes/images')

app.use('/users', users);
app.use('/centres', centres);
app.use('/appointments', appointments);
app.use('/newsarticles', newsarticles);
app.use('/images')

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  // check for page routes that we expect in the frontend to provide correct status code.
  const goodPageRoutes = ["/", "/signin", "/signup", "/profile", "/booking", "/screening", "/faqs", "/centres"];
  if (!goodPageRoutes.includes(req.url)) {
    // if url not in expected page routes, set status to 404.
    res.status(404);
  }

  // send index.html
  res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/

// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
  log(`Listening on port ${port}...`)
})
