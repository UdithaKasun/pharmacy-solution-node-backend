var express = require('express');
var User = require('../models/User');
var Logger = require('../routes/common/Logger');
var utils = require('./common/utilities');

var authenticationRoute = express.Router();

/*
Handling Middleware Functionality
*/
authenticationRoute.use(function timeLog(req, res, next) {
    next()
});


/*
Adding a new user to the Database
*/
authenticationRoute.post('/', function (req, res) {
    var user = new User(req.body);
    utils.encrypt(user.password).then(hashedPassword => {
        user.password = hashedPassword;
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
    })
});

module.exports = authenticationRoute;