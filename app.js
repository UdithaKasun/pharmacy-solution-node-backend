var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');
var passport = require('passport');
var User = require('./models/User');

var Logger = require('./routes/common/Logger');
var utils = require('./routes/common/utilities');
var db = require('./routes/common/DBConnection');

var authenticationApi = require('./routes/authentication_api');

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

/* Authentication Start */

// Use the passport package in our application
app.use(passport.initialize());
// pass passport for configuration
require('./config/passport')(passport);

/* Authentication End */

app.use('/drug', drugApi);
app.use('/authentcation', authenticationApi);

app.listen(CONFIG.SERVER_PORT, function (err) {
  Logger.info("Express Server Started at Port : " + CONFIG.SERVER_PORT);
});