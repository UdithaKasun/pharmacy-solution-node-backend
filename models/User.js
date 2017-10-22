/**
 * Created by Uditha Kasun on 9/26/2017.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.promise = global.promise
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:  String,
    password : String
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var User = mongoose.model('User',UserSchema,'users');

module.exports = User;