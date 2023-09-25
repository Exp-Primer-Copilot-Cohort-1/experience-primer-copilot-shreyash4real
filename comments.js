//create web server
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'comments';
const client = new MongoClient(url);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to database
let db;
client.connect(function(err) {
    console.log("Connected successfully to server");
    db = client.db(dbName);
});

//get all comments
app.get('/comments', function(req, res) {
    db.collection('comments').find({}).toArray(function(err, docs) {
        console.log(docs);
        res.send(docs);
    });
});

//get all comments on a post
app.get('/comments/:post', function(req, res) {
    console.log(req.params.post);
    db.collection('comments').find({post: req.params.post}).toArray(function(err, docs) {
        console.log(docs);
        res.send(docs);
    });
});

//add new comment
app.post('/comments', function(req, res) {
    console.log(req.body);
    db.collection('comments').insertOne(req.body, function(err, result) {
        console.log("Inserted 1 document into the collection");
        res.send(result);
    });
});

//delete comment
app.delete('/comments/:id', function(req, res) {
    console.log(req.params.id);
    db.collection('comments').deleteOne({_id: req.params.id}, function(err, result) {
        console.log("Deleted 1 document from the collection");
        res.send(result);
    });
});

//update comment
app.put('/comments/:id', function(req, res) {
    console.log(req.body);
    db.collection('comments').updateOne({_id: req.params.id}, {$set: req.body}, function(err, result) {
        console.log("Updated 1 document in the collection");
        res.send(result);
    });
});

//start server
app.listen(3000, function() {
    console.log("Server started on port 3000");
}
