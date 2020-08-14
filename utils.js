const { User } = require('./models/user');
const log = console.log;

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
  return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// Middleware for authentication of resources for regular users
const authenticate = (req, res, next) => {
  log('From authenticate');
  log(req.session);
  if (req.session.user) {
    User.findById(req.session.user).then((user) => {
      if (!user) {
        return Promise.reject()
      } else {
        req.user = user
        next()
      }
    }).catch((error) => {
      log(error);
      res.status(401).send("Unauthorized");
    })
  } else {
    res.status(401).send("Unauthorized");
  }
}

// Middleware for authentication of resources for admin
const authenticateAdmin = (req, res, next) => {
  if (req.session.user && req.session.isAdmin) {
    User.findById(req.session.user).then((admin) => {
      if (!admin) {
        return Promise.reject()
      } else {
        req.admin = admin
        next()
      }
    }).catch((error) => {
      res.status(401).send("Unauthorized")
    })
  } else {
    res.status(401).send("Unauthorized")
  }
}

module.exports = {
  isMongoError,
  authenticate,
  authenticateAdmin
}