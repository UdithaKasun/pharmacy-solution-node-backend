var router = require('express').Router();
var mongoose = require('mongoose');
var router = require('express').Router();
var Manufacturer = mongoose.model('Manufacturer');
var User = mongoose.model('User');
var auth = require('../auth');

//Getting all manufacturers from the database
router.get('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Manufacturer.find({})
      .then(function (manufacturers) {
        if (!manufacturers) { return res.sendStatus(404); }
        return res.json({
          manufacturers: manufacturers
        });
      }).catch(next);

  });
});

//Add new manufacturer to the database
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var manufacturer = new Manufacturer(req.body.manufacturer);

    return manufacturer.save().then(function () {
      return res.sendStatus(201);
    });
  }).catch(next);
});

//Getting by quering the manufacturer id
router.get('/:manufacturerid', auth.required, function (req, res, next) {

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Manufacturer.findOne({ manufacturer_id: req.params.manufacturerid })
      .then(function (manufacturer) {
        if (!manufacturer) { return res.sendStatus(404); }
        return res.json({
          manufacturer: manufacturer
        });
      }).catch(next);

  });
});

//Delete manufacturer by quering the manufacturer id
router.delete('/:manufacturerid', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Manufacturer.remove({ manufacturer_id: req.params.manufacturerid })
      .then(function (status) {
        res.sendStatus(200);
      })
      .catch(next);
  }).catch(next);
});

//Update manufacturer by manufacturer id
router.put('/:manufacturerid', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Manufacturer.findOne({ manufacturer_id: req.params.manufacturerid })
      .then(function (manufacturer) {
        if (!manufacturer) { return res.sendStatus(404); }
        manufacturer = new Manufacturer(req.body.manufacturer);
        manufacturer.save()
          .then(function (manufacturer) {
            res.sendStatus(200);
          }).catch(next);
      }).catch(next);
  }).catch(next);;
});

module.exports = router;