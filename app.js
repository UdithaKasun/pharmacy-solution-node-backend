var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');

var app = express();
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var drugApi = require('./routes/drug_api');

app.use('/drug', drugApi);

app.listen(4000, function () {
  console.log('app listening on port 4000!')
});