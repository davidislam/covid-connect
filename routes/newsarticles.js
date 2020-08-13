'use strict';
const express = require('express');
let router = express.Router();

const { NewsArticle } = require('./../models/news');
const { ObjectID } = require('mongodb');

const log = console.log;

const { isMongoError, authenticate, authenticateAdmin } = require('./../utils');

router
  .route('/')
  .get((req, res) => {
    NewsArticle.find().then((newsarticles) => {
      res.send(newsarticles)
    })
      .catch((error) => {
        log(error)
        res.status(500).send("Internal Server Error")
      })
  })
  .post(authenticateAdmin, (req, res) => {
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

router
  .route('/:id')
  .get((req, res) => {
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
  .delete(authenticateAdmin, (req, res) => {
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
  .patch(authenticateAdmin, (req, res) => {
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


module.exports = router;