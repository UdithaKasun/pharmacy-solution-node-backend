var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    customer_id : String,
    customer_name : String,
    customer_nic:String,
    customer_address :String,
    customer_email:String,
    customer_contact:String,
    customer_age : String,
    customer_order_history : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Prescription'
        }
    ]
});

mongoose.model('Customer',customerSchema,'pharm_customer');
