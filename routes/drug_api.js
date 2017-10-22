/**
 * Created by Uditha Kasun on 9/26/2017.
 */

var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var Drug = require('../models/Drug');
var Logger = require('../routes/common/Logger');

var DrugRoute = express.Router();

/*
Handling Middleware Functionality
*/
DrugRoute.use(function timeLog (req, res, next) {
    next()
});

/*
Getting all Drugs from Database.
*/

DrugRoute.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Drug.find({}, function (err, docs) {
            if(err){
                Logger.error(err.message);
                res.status(500).send({ type : "Error", error: err.message });
                res.end();
            }
            else{
                res.json(docs);
            }
        });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

/* 
Get a drug by drug serial number
*/
DrugRoute.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Drug.findOne({ drug_srno : req.params.id }, function (err, drug) {
            if(err){
                Logger.error(err.message);
                res.status(500).send({ type : "Error", error: err.message });
                res.end();
            }
            else{
                if(drug != null){
                    res.json(drug);
                }
                else{
                    res.sendStatus(404);
                }
    
            }
        });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

/*
Adding a new Drug to the Database
*/
DrugRoute.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var drug = new Drug(req.body);
        drug.save( (err,newDrug) => {
                if(err){
                    Logger.error(err);
                    res.status(500).send({ type : "Error", error: err.message });
                    res.end();
                }
                else{
                    res.status(201).send({ drug_srno : newDrug.drug_srno });
        }
        });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

/*
Deleting a drug from the database by Drug Serial Number 
*/
DrugRoute.delete('/:drugId', function (req, res) {


    Drug.remove({drug_srno: req.params.drugId}, (err)=>{
        if(err){
            Logger.error(err);
            res.status(500).send({ type : "Error", error: err.message });
            res.end();
        }
        else{
            res.sendStatus(200);
}
})

});

/*
Update Drug Detail by Drug Serial Number
*/
DrugRoute.put('/:id', function (req, res) {
    Drug.findOne({ drug_srno : req.params.id }, function (err, drug) {
        if (err){
            Logger.error(err);
            res.status(500).send({ type : "Error", error: err.message });
            res.end();
        }

        drug.drug_name = req.body.drug_name;

        drug.save(function (err, updatedDrug) {
            if (err){
                Logger.error(err);
                res.status(500).send({ type : "Error", error: err.message });
                res.end();
            }
            res.sendStatus(200);
        });
    });
});

getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

module.exports = DrugRoute;