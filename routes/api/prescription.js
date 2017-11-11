var router = require('express').Router();
var mongoose = require('mongoose');
var router = require('express').Router();
var Prescription = mongoose.model('Prescription');
var User = mongoose.model('User');
var auth = require('../auth');

//Getting all prescriptions from the database
router.get('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Prescription.find()
      .then(function (prescriptions) {
        if (!prescriptions) { return res.sendStatus(404); }
        return res.json({
          prescriptions: prescriptions
        });
      }).catch(next);

  });
});

//Add new prescription to the database
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var prescription = new Prescription(req.body.prescription);
    prescription.prescription_id = "PRES_" + new Date().getTime();
    prescription.prescription_created_timestamp = new Date().getTime();

    return prescription.save().then(function () {
      return res.sendStatus(201);
    });
  }).catch(next);
});

//Getting by quering the prescription id
router.get('/:prescriptionid', auth.required, function (req, res, next) {

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Prescription.findOne({ prescription_id: req.params.prescriptionid })
        .populate('prescription_created_user_id')
        .populate('prescription_patient_name')
        .populate('prescription_drugs.prescription_item_drug_name')
        .then(function (prescription) {
        if (!prescription) { return res.sendStatus(404); }
        return res.json({
          prescription: prescription
        });
      }).catch(next);

  });
});

//Delete prescription by quering the prescription id
router.delete('/:prescriptionid', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Prescription.remove({ prescription_id: req.params.prescriptionid })
      .then(function (status) {
        res.sendStatus(200);
      })
      .catch(next);
  }).catch(next);
});

//Update prescription by prescription id
router.put('/:prescriptionid', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Prescription.findOne({ prescription_id: req.params.prescriptionid })
      .then(function (prescription) {
        if (!prescription) { return res.sendStatus(404); }
        prescription = new Prescription(req.body.prescription);
        prescription.save()
          .then(function (prescription) {
            res.sendStatus(200);
          }).catch(next);
      }).catch(next);
  }).catch(next);;
});

module.exports = router;