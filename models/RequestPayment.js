var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var RequestPaymentSchema = new Schema({
    request_id: String,
    request_assigned_supplier_id: {
        type:mongoose.Schema.ObjectId,
        ref:'Supplier'
    },
    request_payment_status: String,
    request_payment_initiated_user_id: {
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    requset_payment_initiated_date: String,
    requset_payment_verified_user_id: {
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    request_payment_verified_date: String,
    request_payment_amount: String,
    request_payment_remarks: String
});

mongoose.model('RequestPayment',RequestPaymentSchema,'pharm_requestpayment');
