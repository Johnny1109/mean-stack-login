var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://johnny:test123@ec2-13-127-45-76.ap-south-1.compute.amazonaws.com:27017/dummyDB';

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
