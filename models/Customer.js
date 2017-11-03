var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    customer_id : String,
    customer_name : String,
    customer_address :String,
    customer_age : String,
    customer_order_history : [
        {
            id : String,
            date : String,
            items : [{
                id : String,
                name : String,
                price : String
            }]
        }
    ]
});

mongoose.model('Customer',customerSchema,'pharm_customer');
