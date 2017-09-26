/**
 * Created by Uditha Kasun on 9/26/2017.
 */

var express = require('express');
var Drug = require('../models/Drug');
var db = require('./DBConnection');

var DrugRoute = express.Router();

// middleware that is specific to this router
DrugRoute.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

// Get All Books
DrugRoute.get('/', function (req, res) {
    db_instance = db.getConnection();
    console.log(db_instance());
    // db_instance.collection("drug").find({}).toArray(function (err, remongo_responses) {
    //     if (err) {
    //         console.log(err);
    //         return res.status(404).json({
    //             message: JSON.stringify(err),
    //             error: true
    //         });
    //     }

    //     return res.status(200).json({
    //         data: remongo_responses,
    //         error: false
    //     })

    // });
});

//Get a Book Identified by Id
DrugRoute.get('/:id', function (req, res) {
    Book.findById(req.params.id, function (err, books) {
        if(err){
            res.sendStatus(500);
        }
        else{
            if(books != null){
                res.json(books);
            }
            else{
                res.sendStatus(404);
            }

        }
    });
});


// Add New Book
DrugRoute.post('/', function (req, res) {
var drug = new Drug(req.body);
console.log(req.body);
drug.save( (err,dbBook) => {
        if(err){
            res.sendStatus(500);
        }
        else{
            res.status(201).send({ _id : dbBook._id });
}
});
});

// Delete a Existing Book
DrugRoute.delete('/:bookId', function (req, res) {


    Book.findByIdAndRemove({_id: req.params.bookId}, (err)=>{
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
        else{
            res.sendStatus(204);
}
})

});

// Update Book
DrugRoute.put('/:id', function (req, res) {
    Book.findById(req.params.id, function (err, book) {
        if (err)
            res.sendStatus(500);

        book.title = req.body.title;
        book.author = req.body.author;

        book.save(function (err, updatedBook) {
            if (err)
                res.sendStatus(500);
            res.json(updatedBook);
        });
    });
});

module.exports = DrugRoute;