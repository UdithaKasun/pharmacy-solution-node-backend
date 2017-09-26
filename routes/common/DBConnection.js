// Bring Mongoose into the app 
var mongoose = require( 'mongoose' ); 
const CONFIG = require('../../config/config');
var Logger = require('./Logger');

// Build the connection string 
var dbURI = CONFIG.DB_URL; 

// Create the database connection 
mongoose.connect(dbURI,{useMongoClient: true}); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  Logger.info("MongoDB database connection initiated with url -  "+dbURI);  
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  Logger.fatal(err.message);
  process.exit(-1);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  Logger.info("MongoDB database Connection Disconnected");  
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    Logger.info("MongoDB database Connection Disconnected through Application Termination"); 
    process.exit(0); 
  }); 
}); 