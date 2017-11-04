var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var drugRequestSchema = new Schema({
    request_id : String,
    request_created_user : {
        type: mongoose.Schema.ObjectId,
        ref:'User'
    },
    request_created_timestamp: String,
    request_last_update_date:String,
    request_status : String,
    request_assigned_supplier_id: {
        type:mongoose.Schema.ObjectId,
        ref:'Supplier'
    },
    request_drugs:[{
        request_drug_id : {
            type:mongoose.Schema.ObjectId,
            ref: 'Drug'
        },
        request_drug_quantity:String,
        request_drug_unit_price:String,
        request_total_cost:String,
        request_remarks:String
    }]
});

mongoose.model('DrugRequest',drugRequestSchema,'pharm_drugrequest');
