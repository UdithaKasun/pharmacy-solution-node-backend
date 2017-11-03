var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var prescriptionSchema = new Schema({
    prescription_id : String,
    prescription_created_user: String,
    prescription_created_timestamp:String,
    prescription_last_update_date:String,
    prescription_status:String,
    prescription_patient_id : {
        type : mongoose.Schema.ObjectId,
        ref : 'Customer'
    },
    prescription_drugs : [
        {
            prescription_item_drug_id : {
                type : mongoose.Schema.ObjectId,
                ref : 'Drug'
            },
            prescription_item_frequency:String,
            prescription_item_dosage:String,
            prescription_item_period:String,
            prescription_item_quantity:String,
            prescription_total_cost:String,
            prescription_issued_user:String
        }
    ]
});

mongoose.model('Prescription',prescriptionSchema,'pharm_prescription');
