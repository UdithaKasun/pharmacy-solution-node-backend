var router = require('express').Router();
var mongoose = require('mongoose');
var router = require('express').Router();
var Supplier = mongoose.model('Supplier');
var User = mongoose.model('User');
var auth = require('../auth');

//Getting all suppliers from the database
router.get('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Supplier.find({})
    .populate('supplier_drugs')
      .then(function (suppliers) {
        if (!suppliers) { return res.sendStatus(404); }
        return res.json({
          suppliers: suppliers
        });
      }).catch(next);

  });
});

//Add new supplier to the database
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var supplier = new Supplier(req.body.supplier);

    return supplier.save().then(function () {
      return res.sendStatus(201);
    });
  }).catch(next);
});

//Getting by quering the supplier id
router.get('/:supplierid', auth.required, function (req, res, next) {

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Supplier.findOne({ supplier_id: req.params.supplierid })
    .populate('supplier_drugs')
      .then(function (supplier) {
        if (!supplier) { return res.sendStatus(404); }
        return res.json({
          supplier: supplier
        });
      }).catch(next);

  });
});

//Getting by quering the supplier name
router.get('/:suppliername', auth.required, function (req, res, next) {
    
      User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }
    
        Supplier.findOne({ supplier_name: req.params.suppliername })
        .populate('supplier_drugs')
          .then(function (supplier) {
            if (!supplier) { return res.sendStatus(404); }
            return res.json({
              supplier: supplier
            });
          }).catch(next);
    
      });
    });

//Delete supplier by quering the supplier id
router.delete('/:supplierid', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Supplier.remove({ supplier_id: req.params.supplierid })
      .then(function (status) {
        res.sendStatus(200);
      })
      .catch(next);
  }).catch(next);
});

//Update supplier by supplier id
router.put('/:supplierid', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Supplier.findOne({ supplier_id: req.params.supplierid })
      .then(function (supplier) {
        if (!supplier) { return res.sendStatus(404); }
        supplier  = new Supplier(req.body.supplier);
        supplier.save()
          .then(function (supplier) {
            res.sendStatus(200);
          }).catch(next);
      }).catch(next);
  }).catch(next);;
});

module.exports = router;