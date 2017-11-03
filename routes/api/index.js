var router = require('express').Router();

router.use('/', require('./users'));
router.use('/drugs', require('./drugs'));
router.use('/customer', require('./customer'));
router.use('/manufacturer', require('./manufacturer'));

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;