var router = require('express').Router();
var mongoose = require('mongoose');
var router = require('express').Router();
var Drug = mongoose.model('Drug');
var User = mongoose.model('User');
var Supplier = mongoose.model('Supplier');
var DrugCategory = mongoose.model('DrugCategory');
var auth = require('../auth');

//Getting all suppliers from the database
router.get('/', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        Supplier.find({})
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
        supplier.supplier_id = "SUP_" + new Date().getTime();
        return supplier.save().then(function () {
            return res.json({ status: "SUCCESS" });
        });
    }).catch(next);
});

//Getting by quering the drug id
router.get('/:supplier_id', auth.required, function (req, res, next) {

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        Supplier.findOne({ supplier_id: req.params.supplier_id })
            .then(function (supplier) {
                if (!supplier) { return res.sendStatus(404); }
                return res.json({
                    supplier: supplier
                });
            }).catch(next);

    });
});

//Delete supplier by ID
router.delete('/:supplierId', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        Supplier.remove({ supplier_id: req.params.supplierId })
            .then(function (status) {
                return res.json({ status: "SUCCESS" });
            })
            .catch(next);
    }).catch(next);
});

//Update supplier by ID
router.put('/:supplierId', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        Supplier.findOne({ supplier_id: req.params.supplier_id })
            .then(function (supplier) {
                if (!supplier) { return res.sendStatus(404); }
                supplier.supplier_name = req.body.supplier.supplier_name;
                supplier.supplier_contact_number = req.body.supplier.supplier_contact_number;
                supplier.supplier_contact_address = req.body.supplier.supplier_contact_address;
                supplier.supplier_contact_email_address = req.body.supplier.supplier_contact_email_address;
                supplier.supplier_payment_details = req.body.supplier.supplier_payment_details;
                supplier.save()
                    .then(function (supplier) {
                        return res.json({ status: "SUCCESS" });
                    }).catch(next);
            }).catch(next);
    }).catch(next);;
});

module.exports = router;