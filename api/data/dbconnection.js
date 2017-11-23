var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://root:7xPyVJTspNi3@ec2-52-14-108-178.us-east-2.compute.amazonaws.com:27017/ctol';

var _connection = null;

var open = function() {
  MongoClient.connect(dburl, function(err, db) {
    if (err) {
      console.log("DB connection failed");
      return;
    }
    _connection = db;
    console.log("DB connection open");
  });
};

var get = function() {
  return _connection;
};

module.exports = {
  open : open,
  get : get
};