var router = require('express').Router();
var mongoose = require('mongoose');
var router = require('express').Router();
var RequestPayment = mongoose.model('RequestPayment');
var User = mongoose.model('User');
var auth = require('../auth');

//Getting all requestPayments from the database
router.get('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    RequestPayment.find({})
    .populate('request_assigned_supplier_id')
    .populate('request_payment_initiated_user_id')
    .populate('requset_payment_verified_user_id')
      .then(function (requestPayments) {
        if (!requestPayments) { return res.sendStatus(404); }
        return res.json({
          requestPayments: requestPayments
        });
      }).catch(next);

  });
});

//Add new requestPayment to the database
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var requestPayment = new RequestPayment(req.body.requestPayment);

    return requestPayment.save().then(function () {
      return res.sendStatus(201);
    });
  }).catch(next);
});

//Getting by quering the requestPayment id
router.get('/:requestPaymentid', auth.required, function (req, res, next) {

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    RequestPayment.findOne({ request_id: req.params.requestPaymentid })
        .populate('request_assigned_supplier_id')
        .populate('request_payment_initiated_user_id')
        .populate('requset_payment_verified_user_id')
      .then(function (requestPayment) {
        if (!requestPayment) { return res.sendStatus(404); }
        return res.json({
          requestPayment: requestPayment
        });
      }).catch(next);

  });
});

//Delete requestPayment by quering the requestPayment id
router.delete('/:requestPaymentid', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    RequestPayment.remove({ request_id: req.params.requestPaymentid })
      .then(function (status) {
        res.sendStatus(200);
      })
      .catch(next);
  }).catch(next);
});

//Update requestPayment by requestPayment id
router.put('/:requestPaymentid', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    RequestPayment.findOne({ request_id: req.params.requestPaymentid })
      .then(function (requestPayment) {
        if (!requestPayment) { return res.sendStatus(404); }
        requestPayment = new RequestPayment(req.body.requestPayment);
        requestPayment.save()
          .then(function (requestPayment) {
            res.sendStatus(200);
          }).catch(next);
      }).catch(next);
  }).catch(next);;
});

module.exports = router;