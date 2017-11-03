var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var supplierSchema = new Schema({
    supplier_id:  String,
    supplier_name : String,
    supplier_contact_number : String,
    supplier_contact_address : Date,
    supplier_active : String,
    supplier_contact_email_address : String,
    supplier_drugs : [],
    supplier_payment_details : []
});

mongoose.model('Supplier',supplierSchema,'pharm_supplier');
