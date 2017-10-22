var bcrypt = require('bcrypt');
const saltRounds = 10;

bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
    var fluffy = new Kitten({ name: 'fluffy' });
});