var mongoose = require('mongoose');
var Group     = mongoose.model('Group');
var bcrypt   = require('bcrypt-nodejs');
var jwt      = require('jsonwebtoken');

module.exports.groupsGetAll = function(req,res) {
	
	Group
    .find()
    .exec(function(err, groups) {
      console.log(err);
      console.log(groups);
      if (err) {
        console.log("Error finding groups");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found groups ", groups.length);
        res
          .json(groups);
      }
    });

}
