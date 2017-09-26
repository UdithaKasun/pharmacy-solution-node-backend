var http = require('http');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var MongoConnection = function() {};

module.exports = MongoConnection;

/* 
    Mongo DB instance is treated as a singleton instance here
    if the instance is undefined then a connection will be initiated and assigned
*/
MongoConnection.getConnection = function() {
    if (typeof MongoConnection.connection === 'undefined') {
        MongoConnection.InitDb();
    }
    return MongoConnection.connection;

};


//
MongoConnection.InitDb = function() {
    console.log("Initaliazing Database...");
    MongoClient.connect('mongodb://' + '127.0.0.1' + ':' + '27017' + '/' + 'pharmacy_solution_db', function(err, db) {
        if (err) {
            console.log(err);
        } else {
            MongoConnection.connection = db;
            console.log('OK');
            console.log(db);
        }
    });
};