var mongoose = require('mongoose');
var User     = mongoose.model('User');
var bcrypt   = require('bcrypt-nodejs');
var jwt      = require('jsonwebtoken');

module.exports.usersGetAll = function(req,res) {
	
	User
    .find()
    .exec(function(err, users) {
      console.log(err);
      console.log(users);
      if (err) {
        console.log("Error finding users");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found courses", users.length);
        res
          .json(users);
      }
    });

}


module.exports.register = function(req, res) {
  console.log('registering user');

 
  var email = req.body.email;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var occupation = req.body.occupation;
  var company = req.body.company;
  var region = req.body.region;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;
  var country = req.body.country;
  var phone = req.body.phone;
  var type = "normal";
  var password = req.body.password;
 
  User.create({
    email: email,
    firstName: firstname,
    lastName: lastname,
    occupation: occupation,
    company: company,
    region: region,
    address: address,
    city: city,
    state: state,
    zip: zip,
    country: country,
    phone: phone,
	type:type,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	
  }, function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log('user created', user);
      res.status(201).json(user);
    }
  });
};

module.exports.login = function(req, res) {
	
  console.log('logging in user');
  var email = req.body.email;
  var password = req.body.password;
  console.log('logged user' +email);
  User.findOne({
    email: email
  }).exec(function(err, user) {
    if (err) {
      console.log(err);
      console.log("User already exist");
      res.status(400).json(err);
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        console.log('User found', user);
        var token = jwt.sign({ user: user }, 's3cr3t', { expiresIn: 100 });
		console.log("token ", token)
        res.status(200).json({success: true, token: token});
		
		
      } else {
        res.status(401).json('Unauthorized');
      }
    }
  });
  
};

module.exports.authenticate = function(req, res, next) {
	
  var headerExists = req.headers.authorization;
  if (headerExists) {
    var token = req.headers.authorization.split(' ')[1]; //--> Authorization Bearer xxx
    jwt.verify(token, 's3cr3t', function(error, decoded) {
      if (error) {
        console.log(error);
        res.status(401).json('Unauthorized');
      } else {
        req.user = decoded.email;
        next();
      }
    });
  } else {
    res.status(403).json('No token provided');
  }
  
};
