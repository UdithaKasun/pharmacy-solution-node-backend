var router = require('express').Router();
var mongoose = require('mongoose');
var router = require('express').Router();
var DrugRequest = mongoose.model('DrugRequest');
var User = mongoose.model('User');
var auth = require('../auth');

//Getting all drugRequests from the database
router.get('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    DrugRequest.find()
        .populate('request_assigned_supplier_id')
        .populate('request_drugs.request_drug_id')
      .then(function (drugRequests) {
        if (!drugRequests) { return res.sendStatus(404); }
        return res.json({
          drugRequests: drugRequests
        });
      }).catch(next);

  });
});

//Add new drugRequest to the database
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var drugRequest = new DrugRequest(req.body.drugRequest);

    return drugRequest.save().then(function () {
      return res.sendStatus(201);
    });
  }).catch(next);
});

//Getting by quering the drugRequest id
router.get('/:drugRequestid', auth.required, function (req, res, next) {

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    DrugRequest.findOne({ request_id: req.params.drugRequestid })
        .populate('request_assigned_supplier_id')
        .populate('request_drugs.request_drug_id')
        .then(function (drugRequest) {
        if (!drugRequest) { return res.sendStatus(404); }
        return res.json({
          drugRequest: drugRequest
        });
      }).catch(next);

  });
});

//Delete drugRequest by quering the drugRequest id
router.delete('/:drugRequestid', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    DrugRequest.remove({ request_id: req.params.drugRequestid })
      .then(function (status) {
        res.sendStatus(200);
      })
      .catch(next);
  }).catch(next);
});

//Update drugRequest by drugRequest id
router.put('/:drugRequestid', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    DrugRequest.findOne({ request_id: req.params.drugRequestid })
      .then(function (drugRequest) {
        if (!drugRequest) { return res.sendStatus(404); }
        drugRequest = new DrugRequest(req.body.drugRequest);
        drugRequest.save()
          .then(function (drugRequest) {
            res.sendStatus(200);
          }).catch(next);
      }).catch(next);
  }).catch(next);;
});

module.exports = router;