var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var Promise = require('promise');
var listData;
var gridData;
var counterId;
var cardData;
var delGrid;
var updGrid;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var url = 'mongodb://localhost:27017/agile';

app.post('/api/createList', function (req, res) {
  console.log(req.body);
  listData = req.body;
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    inserCard(db, function (err,result) {
      db.close();
      res.status(200).send(result);
    });
  });
});

app.post('/api/createGrid', function (req, res) {
  gridData = req.body;
  getCounter(url, function (err, result) {
    MongoClient.connect(url, function (err, db) {
      insertGridDocument(db, function () {
        db.close();
        updateCounter(url, function () {
          db.close();
          res.status(200).send(gridData);
        });
      });
    });
  })
});

app.post('/api/deleteCard', function (req, res) {
  console.log(req.body);
  cardData = req.body;
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    deleteCard(db, function (err,result) {
      db.close();
      res.status(200).send(result);
    });
  });
});

var deleteCard = function(db, callback){
   db.collection('Grid').update(
      { "cards.taskName": cardData.taskName },
      {$pull: {"cards":{taskName : cardData.taskName}}}, false, true,
      function (err, results) {
        console.log("result ");
        var res = 200;
        callback(null,res);
      });
}


app.post('/api/dropCard', function (req, res) {
  console.log(req.body);
  cardData = req.body.card;
  delGrid = req.body.delGrid;
  updGrid = req.body.updGrid;
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    dropCard(db, function (err,result) {
      db.close();
      res.status(200).send(result);
    });
  });
});

var dropCard = function (db, callback) {
  
   db.collection('Grid').update(
      { "cards.taskName": cardData.taskName },
      {$pull: {"cards":{taskName : cardData.taskName}}}, false, true,
      function (err, results) {
        console.log("result ");
        var res = 200;
        callback(null,res);
      });

  // var updateDrop = function(callback){
  //   db.collection('Grid').update(
  //     { "Id": parseInt(updGrid) },
  //     { $push: { "cards": JSON.parse(cardData) } },
  //     function (err, results) {
  //       console.log("result " + JSON.parse(cardData));
  //       var res = JSON.parse(listData.data)
  //       callback(res);
  //     });
  // }
}

var inserCard = function (db, callback) {
  
  db.collection('Grid').update(
      { "Id":   parseInt(listData.gridId) },
      { $push: { "cards":  JSON.parse(listData.data)}},
      function (err, results) {
        console.log("result "+JSON.parse(listData.data));
        var res = JSON.parse(listData.data)
        callback(null,res);
      });
};

var insertGridDocument = function (db, callback) {
  gridData['Id'] = counterId.counter + 1; 
  db.collection('Grid').insertOne(gridData, function (err, result) {
    assert.equal(err, null);
    callback();
  });
};

var getCounter = function (url, callback) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);

    db.collection("Inventory").findOne({}, function (err, result) {
      if (err) throw err;
      counterId = result;
      db.close();
      callback(null, null);
    });
  });
}

var updateCounter = function (url, callback) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);

    db.collection("Inventory").updateOne(
      { "counter": counterId.counter },
      { $set: { "counter": (counterId.counter + 1) } },
      function (err, results) {
        console.log(results.result);
        callback();
      });
  });
}

app.listen(8080);