var bcrypt = require('bcrypt');
const saltRounds = 10;

var utils = {};

/* This function will return a promise which can be used to
generate a hashed value from a source text */

utils.encrypt = function encryptText(source){
    return bcrypt.hash(source, saltRounds);
}

module.exports = utils;