var router = require('express').Router();
var mongoose = require('mongoose');
var router = require('express').Router();
var Customer = mongoose.model('Customer');
var User = mongoose.model('User');
var auth = require('../auth');

//Getting all customers from the database
router.get('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Customer.find({})
      .then(function (customers) {
        if (!customers) { return res.sendStatus(404); }
        return res.json({
          customers: customers
        });
      }).catch(next);

  });
});

//Add new customer to the database
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var customer = new Customer(req.body.customer);

    return customer.save().then(function () {
      return res.sendStatus(201);
    });
  }).catch(next);
});

//Getting by quering the customer id
router.get('/:customerid', auth.required, function (req, res, next) {

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Customer.findOne({ customer_id: req.params.customerid })
      .then(function (customer) {
        if (!customer) { return res.sendStatus(404); }
        return res.json({
          customer: customer
        });
      }).catch(next);

  });
});

//Delete customer by quering the customer id
router.delete('/:customerid', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Customer.remove({ customer_id: req.params.customerid })
      .then(function (status) {
        res.sendStatus(200);
      })
      .catch(next);
  }).catch(next);
});

//Update customer by customer id
router.put('/:customerid', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Customer.findOne({ customer_id: req.params.customerid })
      .then(function (customer) {
        if (!customer) { return res.sendStatus(404); }
        customer = new Customer(req.body.customer);
        customer.save()
          .then(function (customer) {
            res.sendStatus(200);
          }).catch(next);
      }).catch(next);
  }).catch(next);;
});

module.exports = router;