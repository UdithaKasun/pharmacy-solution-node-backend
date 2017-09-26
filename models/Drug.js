/**
 * Created by Uditha Kasun on 9/26/2017.
 */

var mongoose = require('mongoose');
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

var Drug = mongoose.model('Drug',drugSchema,'Drug');

module.exports = Drug;