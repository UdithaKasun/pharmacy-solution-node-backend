var express = require('express');
var jwt = require('jwt-simple');

var User = require('../models/User');
var Logger = require('../routes/common/Logger');
var utils = require('./common/utilities');

var authenticationRoute = express.Router();
var secret = "udithax";

/*
Handling Middleware Functionality
*/
authenticationRoute.use(function timeLog(req, res, next) {
    next()
});


/*
Adding a new user to the Database
*/
authenticationRoute.post('/signup', function (req, res) {
    var user = new User(req.body);
    user.save((err, newUser) => {
        if (err) {
            Logger.error(err);
            res.status(500).send({ type: "Error", error: err.message });
            res.end();
        }
        else {
            res.status(201).send();
        }
    });
});

authenticationRoute.post('/', function (req, res) {
    User.findOne({
        name: req.body.name
      }, function(err, user) {
        if (err) throw err;
     
        if (!user) {
          res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.encode(user, secret);
              // return the information including token as JSON
              res.json({success: true, token: 'JWT ' + token});
            } else {
              res.send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
          });
        }
      });
});

module.exports = authenticationRoute;