var mongoose = require('mongoose');
var Course = mongoose.model('Course');


var runGeoQuery = function(req, res) {

  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);

  if (isNaN(lng) || isNaN(lat)) {
    res
      .status(400)
      .json({
        "message" : "If supplied in querystring, lng and lat must both be numbers"
      });
    return;
  }

  // A geoJSON point
  var point = {
    type : "Point",
    coordinates : [lng, lat]
  };

  var geoOptions = {
    spherical : true,
    maxDistance : 2000,
    num : 5
  };

  Course
    .geoNear(point, geoOptions, function(err, results, stats) {
      console.log('Geo Results', results);
      console.log('Geo stats', stats);
      if (err) {
        console.log("Error finding courses");
        res
          .status(500)
          .json(err);
      } else {
        res
          .status(200)
          .json(results);
      }
    });
};

module.exports.coursesGetAll = function(req, res) {
  console.log('Requested by: ' + req.user);
  console.log('GET the courses');
  console.log(req.query);

  var offset = 0;
  var count = 5;
  var maxCount = 50;

  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery(req, res);
    return;
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        "message" : "If supplied in querystring, count and offset must both be numbers"
      });
    return;
  }

  if (count > maxCount) {
    res
      .status(400)
      .json({
        "message" : "Count limit of " + maxCount + " exceeded"
      });
    return;
  }

  Course
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, courses) {
      console.log(err);
      console.log(courses);
      if (err) {
        console.log("Error finding courses");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found courses", courses.length);
        res
          .json(courses);
      }
    });

};

module.exports.coursesGetOne = function(req, res) {
  var id = req.params.courseId;

  console.log('GET courseId', id);

  Course
    .findById(id)
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding course");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("courseId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "course ID not found " + id
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });

};

var _splitArray = function(input) {
  var output;
  if (input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
};

module.exports.coursesAddOne = function(req, res) {
	
  console.log("POST new course");

  Course
    .create({
      name : req.body.name,
      description : req.body.description,
      stars : parseInt(req.body.stars,10),
      services : _splitArray(req.body.services),
      photos : _splitArray(req.body.photos),
      currency : req.body.currency,
      location : {
        address : req.body.address,
        coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      }
    }, function(err, course) {
      if (err) {
        console.log("Error creating course");
        res
          .status(400)
          .json(err);
      } else {
        console.log("course created!", course);
        res
          .status(201)
          .json(course);
      }
    });

};


module.exports.coursesUpdateOne = function(req, res) {
	
  var courseId = req.params.courseId;
  console.log('GET courseId', courseId);
  
  Course
    .findById(courseId)
    .exec(function(err, course) {
      if (err) {
        console.log("Error finding course");
        res
          .status(500)
          .json(err);
          return;
      } else if(!course) {
        console.log("courseId not found in database", courseId);
        res
          .status(404)
          .lson({
            "message" : "course ID not found " + courseId
          });
          return;
      }

      course.title = req.body.name;
      course.description = req.body.description;
      course.stars = parseInt(req.body.stars,10);
      course.url = req.body.url;
      course.status = req.body.status;
      course.launchtype = req.body.launchmode;
      
      course
        .save(function(err, courseUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });

    });

};
