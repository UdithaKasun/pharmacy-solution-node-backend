var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var manufactuerSchema = new Schema({
    manufacturer_id: String,
    manufacturer_name: String,
    manufacturer_address: String,
    manufacturer_contact: String,
    manufacturer_email: String
});

module.exports = mongoose.model('Manufacturer',manufactuerSchema,'pharm_manufacturer');
