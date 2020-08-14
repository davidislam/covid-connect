'use strict';
const express = require('express');
let router = express.Router();

const { Appointment } = require('./../models/appointment');
const { ObjectID } = require('mongodb');

const log = console.log;

const { isMongoError, authenticate, authenticateAdmin } = require('./../utils');

router
  .route('/user')
  .get(authenticate, (req, res) => {
    Appointment.find({
      creator: req.user._id
    }).then(appts => {
      res.send(appts);
    }).catch(error => {
      log(error);
      res.status(500).send('Internal server error');
    })
  })
  .post(authenticate, (req, res) => {
    const appt = new Appointment({
      date: req.body.date,
      time: req.body.time,
      address: req.body.address,
      creator: req.user._id,
      tid: req.body.tid,
      status: 'Pending',
      cid: req.body.cid,
      day: req.body.day
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

router
  .route('/:id')
  .get(authenticateAdmin, (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
      res.status(404).send()
      return;
    }

    Appointment.findById(id).then((appt) => {
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
  .delete(authenticate, (req, res) => {
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
  .patch(authenticateAdmin, (req, res) => {
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

router
  .route('/')
  .get(authenticateAdmin, (req, res) => {
    Appointment.find({
    }).then(appts => {
      res.send(appts);
    }).catch(error => {
      log(error);
      res.status(500).send('Internal server error');
    })
  })

module.exports = router;