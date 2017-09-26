const express = require('express')
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile('index.html',{ root: __dirname });
})

app.use('/api/Books',require('./app/routes/BookRoute'));
app.use('/api/Authors', require('./app/routes/AuthorRoute'))
app.listen(3000, function () {
    console.log('BookAPI app listening on port 3000!')
})

module.exports = app;