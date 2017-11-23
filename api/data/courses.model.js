var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
 
  description : String,

});

mongoose.model('Course', courseSchema);