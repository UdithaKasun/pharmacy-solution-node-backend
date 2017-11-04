var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var drugSchema = new Schema({
    drug_srno:  String,
    drug_name : String,
    drug_remarks : String,
    drug_create_date : Date,
    drug_create_user : String,
    drug_last_update_date : Date,
    drug_active : Boolean,
    drug_unit : String,
    drug_category_id : String,
    drug_price : Number,
    drug_current_quantity : Number,
    drug_status_reorder : Number
});

module.exports = mongoose.model('Drug',drugSchema,'pharm_drug');
