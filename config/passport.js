var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../models/User');
var secret = "udithax";

module.exports = function(passport) {
 var opts = {};
 opts.secretOrKey = secret;
 opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')

 passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
   User.findOne({id: jwt_payload.id}, function(err, user) {
         if (err) {
             return done(err, false);
         }
         if (user) {
             done(null, user);
         } else {
             done(null, false);
         }
     });
 }));
};