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
    manufacturer.manufacturer_id = "MANU_" + new Date().getTime();
    return manufacturer.save().then(function () {
        return res.json( { status : "SUCCESS"});
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
          return res.json( { status : "SUCCESS"});
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
        //manufacturer = new Manufacturer(req.body.manufacturer);
        manufacturer.manufacturer_name= req.body.manufacturer.manufacturer_name;
        manufacturer.manufacturer_address= req.body.manufacturer.manufacturer_address;
        manufacturer.manufacturer_contact= req.body.manufacturer.manufacturer_contact;
        manufacturer.manufacturer_email= req.body.manufacturer.manufacturer_email;
        manufacturer.save()
          .then(function (manufacturer) {
              return res.json( { status : "SUCCESS"});
          }).catch(next);
      }).catch(next);
  }).catch(next);;
});

module.exports = router;