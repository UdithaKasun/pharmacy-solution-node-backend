var router = require('express').Router();
var mongoose = require('mongoose');
var router = require('express').Router();
var Leave = mongoose.model('Leave');
var User = mongoose.model('User');
var auth = require('../auth');

//Getting all drugs from the database
router.get('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Drug.find({})
      .then(function (drugs) {
        if (!drugs) { return res.sendStatus(404); }
        return res.json({
          drugs: drugs
        });
      }).catch(next);

  });
});

//Add new drug to the database
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var leave = new Leave(req.body.leave);

    return leave.save().then(function () {
      return res.json( { status : "SUCCESS"});
    });
  }).catch(next);
});

//Getting by quering the drug id
router.get('/user/:userId', auth.required, function (req, res, next) {

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Leave.find({ user_id: req.params.userId })
      .then(function (leaves) {
        if (!leaves) { return res.sendStatus(404); }
        return res.json({
            leaves: leaves
        });
      }).catch(next);

  });
});

router.get('/leader/:leaderId', auth.required, function (req, res, next) {

    User.findById(req.payload.id).then(function (user) {
      if (!user) { return res.sendStatus(401); }
  
      Leave.find({ leave_approver_id: req.params.leaderId })
        .then(function (leaves) {
          if (!leaves) { return res.sendStatus(404); }
          return res.json({
              leaves: leaves
          });
        }).catch(next);
  
    });
  });

//Delete drug by quering the drug id
router.delete('/:drugid', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Drug.remove({ drug_srno: req.params.drugid })
      .then(function (status) {
        return res.json( { status : "SUCCESS"});
      })
      .catch(next);
  }).catch(next);
});

//Update drug by drug id
router.put('/user/leave/:leaveid', auth.required, function (req, res, next) {
    console.log("Calledd");
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    console.log(req.params.leaveid);
    Leave.findById(req.params.leaveid )
      .then(function (leave) {
        if (!leave) { return res.sendStatus(404); }
        leave.leave_from_date = req.body.leave.leave_from_date;
        leave.leave_to_date = req.body.leave.leave_to_date;
        leave.leave_count = req.body.leave.leave_count;
        leave.save()
          .then(function (leave) {
            return res.json( { status : "SUCCESS"});
          }).catch(next);
      }).catch(next);
  }).catch(next);;
});

//Add new drug category to database
router.post('/categories', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var drugCategory = new DrugCategory(req.body.drugcategory);
    drugCategory.category_id = "DCAT_" + new Date().getTime();
    return drugCategory.save().then(function () {
      return res.json( { status : "SUCCESS"});
    });
  }).catch(next);
});

//Getting all drug categories from database
router.get('/categories/all', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    DrugCategory.find({})
      .then(function (drugcategories) {
        if (!drugcategories) { return res.sendStatus(404); }
        return res.json({
          drugcategories: drugcategories
        });
      }).catch(next);

  });
});

module.exports = router;