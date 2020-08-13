'use strict';
const express = require('express');
let router = express.Router();

const { Centre } = require("./../models/centre");
const { ObjectID } = require('mongodb');

const { isMongoError, authenticate, authenticateAdmin } = require('./../utils');

const log = console.log;

router
  .route('/')
  .post(authenticateAdmin, (req, res) => {
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
  .get((req, res) => {
    Centre.find().then((centres) => {
      res.send(centres);
    })
      .catch((error) => {
        log(error)
        res.status(500).send("Internal Server Error")
      })
  })

router
  .route('/:id')
  .get((req, res) => {
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
  .delete(authenticateAdmin, (req, res) => {
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
  .patch(authenticateAdmin, (req, res) => {
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

router
  .route('city/:city')
  .get((req, res) => {
    const city = req.params.city

    Centre.find({ 'location.city': city }).then((centres) => {
      res.send(centres)
    })
      .catch((error) => {
        log(error)
        res.status(500).send('Internal Server Error')  // server error
      })
  })

router
  .route('/city')
  .get((req, res) => {
    Centre.distinct('location.city')
      .then(result => {
        res.send(result.sort());
      })
      .catch(err => {
        log(err);
        res.status(500).send("Internal Server Error");
      })
  })

router
  .route('/:id/:day/:tid')
  .patch(authenticate, (req, res) => {
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

router
  .route('/insert')
  .post(authenticateAdmin, (req, res) => {
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

module.exports = router;