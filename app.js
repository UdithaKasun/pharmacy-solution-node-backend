//Importing Required Modules
var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var db = require('./routes/common/DBConnection');
var morgan = require('morgan');
var Logger = require('./routes/common/Logger');

const CONFIG = require('./config/config');

var app = express();
app.use(cors());
app.use(morgan('combined'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var drugApi = require('./routes/drug_api');

app.use('/drug', drugApi);

app.listen(CONFIG.SERVER_PORT, function (err) {
  Logger.info("Express Server Started at Port : " + CONFIG.SERVER_PORT);
});