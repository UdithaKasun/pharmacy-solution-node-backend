var mongoose = require('mongoose');
mongoose.promise = global.promise
var Schema = mongoose.Schema;

var drugCategory = new Schema({
    category_id:  String,
    category_name : String
});

mongoose.model('DrugCategory',drugCategory,'pharm_drug_category');
