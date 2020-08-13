'use strict';
const express = require('express');
let router = express.Router();

const { User } = require("./../models/user");
const { ObjectID } = require('mongodb');

const log = console.log;

const { isMongoError, authenticate, authenticateAdmin } = require('./../utils');

router
  .post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const isAdmin = username === 'admin' && password === 'admin';

    // Use the static method on the User model to find a user
    // by their username and password
    User.findByUsernamePassword(username, password)
      .then(user => {
        // Add the user's id to the session cookie.
        // We can check later if this exists to ensure we are logged in.
        req.session.user = user._id;
        req.session.username = user.username;
        req.session.isAdmin = isAdmin;
        res.send({ currentUser: user.username, isAdmin });
      })
      .catch(error => {
        if (isMongoError(error)) {
          res.status(500).send();
        } else {
          res.status(400).send()
        }
      });
  });

router
  .get("/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send()
      }
    });
  });

router
  .get("/check-session", (req, res) => {
    if (req.session.user) {
      res.send({ currentUser: req.session.username });
    } else {
      res.status(401).send();
    }
  });

router
  .route('/')
  .post((req, res) => {
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
  .get(authenticateAdmin, (req, res) => {
    User.find().then(
      users => { res.send(users) },
      error => { res.status(500).send(error) }
    )
  })

router
  .route('/user')
  .get(authenticate, (req, res) => {
    User.findOne({
      _id: req.user._id
    }).then(user => {
      res.send(user);
    }).catch(error => {
      log(error);
      res.status(500).send('Internal server error');
    })
  })
  .patch(authenticate, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { $set: req.body }, { new: true })
      .then(user => {
        if (!user) {
          res.status(404).send();
        } else {
          res.send(user);
        }
      })
      .catch(error => {
        res.status(400).send();
      });
  })

router
  .route('/:id')
  .get(authenticateAdmin, (req, res) => {
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
  .patch(authenticateAdmin, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      res.status(404).send();
      return;
    }

    User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
      .then(user => {
        if (!user) {
          res.status(404).send();
        } else {
          res.send(user);
        }
      })
      .catch(error => {
        res.status(400).send();
      });
  })

module.exports = router;