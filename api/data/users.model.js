var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  
var userSchema = Schema({
 
  email: {
    type: String
  },
   firstName: {
    type: String
  },
   lastName: {
    type: String
  },
   occupation: {
    type: String
  },
   company: {
    type: String
  },
   region: {
    type: String
  },
   address: {
    type: String
  },
   city: {
    type: String
  },
   state: {
    type: String
  },
  zip: {
    type: String
  },
  country: {
    type: String
  },
  phone: {
    type: Number
  },
   type: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
 });


mongoose.model('User', userSchema);
