'use strict';
const express = require('express');
let router = express.Router();

const { Image } = require('../models/image');
const { ObjectID } = require('mongodb');

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const log = console.log;

const { authenticateAdmin } = require('../utils');

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'myxime',
    api_key: '941382216622863',
    api_secret: 'uhrwhg7oX0k4uL4OFeCOIJrWxRI'
});

router
  .route('/')
  .get((req, res) => {
    Image.find().then((images) => {
      res.send(images)
    })
      .catch((error) => {
        log(error)
        res.status(500).send("Internal Server Error")
      })
  })
  .post(authenticateAdmin, multipartMiddleware, (req, res) => {
    cloudinary.uploader.upload(

      req.files.image.path, // req.files contains uploaded files
      function (result) {

        // Create a new image using the Image mongoose model
        var img = new Image({
            image_id: result.public_id, // image id on cloudinary server
            image_url: result.url, // image url on cloudinary server
            created_at: new Date(),
        });

        // Save image to the database
        img.save().then(
          saveRes => {
            res.send(saveRes);
          },
          error => {
            res.status(400).send(error); // 400 for bad request
          }
        );
      })
    })

router
  .route('/:id')
  .delete(authenticateAdmin, (req, res) => {
    const imageId = req.params.imageId;
    if (!ObjectID.isValid(id)) {
      res.status(404).send();
      return;
    }

    cloudinary.uploader.destroy(imageId, function (result) {

      Image.findOneAndRemove({ image_id: imageId })
        .then(img => {
          if (!img) {
              res.status(404).send();
          } else {
              res.send(img);
          }
        })
        .catch(error => {
          res.status(500).send(); // server error, could not delete.
        });
    });
  });
  
module.exports = router;

