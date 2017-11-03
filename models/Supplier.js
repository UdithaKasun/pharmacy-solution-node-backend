var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var supplierSchema = new Schema({
    supplier_id: String,
    supplier_name: String,
    supplier_contact_number: String,
    supplier_contact_address: String,
    supplier_contact_email_address: String,
    supplier_active: Boolean,
    supplier_remarks: String,
    supplier_drugs: [{
        type : mongoose.Schema.ObjectId,
        ref : 'Drug'
    }],
    supplier_payment_details: [
        {
            supplier_payment_id : String,
            supplier_payment_bank_name : String,
            supplier_payment_bank_account: String,
            suuplier_payment_remarks: String,
            supplier_payment_active: Boolean
        }
    ]

});

mongoose.model('Supplier',supplierSchema,'pharm_supplier');
