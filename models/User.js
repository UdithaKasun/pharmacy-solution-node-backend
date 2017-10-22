/**
 * Created by Uditha Kasun on 9/26/2017.
 */

var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:  String,
    password : String
});

var User = mongoose.model('User',userSchema,'users');

module.exports = User;