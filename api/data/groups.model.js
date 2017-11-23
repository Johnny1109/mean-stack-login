var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
  groupname: {
    type: String
   
  },
  status: {
    type: String
  }
  
});

mongoose.model('Group', groupSchema);
