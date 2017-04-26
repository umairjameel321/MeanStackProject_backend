var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
//var mongodb = require('mongodb').MongoClient;
var mongoose = require('mongoose');

//var database;
var Message = mongoose.model('Message', {
    msg: String
});

// use it before all route definitions
app.use(cors({origin:true,credentials: true}));
app.use(bodyParser.json());

app.get('/api/message', GetMessages);
app.post('/api/message', function(req, res) {
    console.log(req.body);
    var message = new Message(req.body);
    message.save();
    //database.collection('messages').insertOne(req.body);
    res.status(200);
});

function GetMessages(req, res) {
    Message.find({}).exec(function(err, result) {
        res.send(result);
    })
}

mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
    if(!err) {
        console.log("we are connected to mongo");
        //GetMessages();
        //database = db;
    }
})

// mongodb.connect("mongodb://localhost:27017/test", function(err, db) {
//     if(!err) {
//         console.log("we are connected to mongo");
//         database = db;
//     }
// })

var server = app.listen(5000, function() {
    console.log("listening on port ", server.address().port);
});
