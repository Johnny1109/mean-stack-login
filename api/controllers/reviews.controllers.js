var mongoose = require('mongoose');
var Course = mongoose.model('Course');


// GET all reviews for a course
module.exports.reviewsGetAll = function(req, res) {
  var id = req.params.courseId;
  console.log('GET reviews for courseId', id);

  Course
    .findById(id)
    .select('reviews')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : []
      };
      if (err) {
        console.log("Error finding course");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("course id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "course ID not found " + id
        };
      } else {
        response.message = doc.reviews ? doc.reviews : [];
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

// GET single review for a course
module.exports.reviewsGetOne = function(req, res) {
  var courseId = req.params.courseId;
  var reviewId = req.params.reviewId;
  console.log('GET reviewId ' + reviewId + ' for courseId ' + courseId);

  Course
    .findById(courseId)
    .select('reviews')
    .exec(function(err, course) {
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding course");
        response.status = 500;
        response.message = err;
      } else if(!course) {
        console.log("course id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "course ID not found " + id
        };
      } else {
        // Get the review
        response.message = course.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!response.message) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      res
        .status(response.status)
        .json(response.message);
    });

};

var _addReview = function (req, res, course) {
  course.reviews.push({
    name : req.body.name,
    rating : parseInt(req.body.rating, 10),
    review : req.body.review
  });

  course.save(function(err, courseUpdated) {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(courseUpdated.reviews[courseUpdated.reviews.length - 1]);
    }
  });

};

module.exports.reviewsAddOne = function(req, res) {

  var id = req.params.courseId;

  console.log('POST review to courseId', id);

  Course
    .findById(id)
    .select('reviews')
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
      if (doc) {
        _addReview(req, res, doc);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });


};


module.exports.reviewsUpdateOne = function(req, res) {
  var courseId = req.params.courseId;
  var reviewId = req.params.reviewId;
  console.log('PUT reviewId ' + reviewId + ' for courseId ' + courseId);

  Course
    .findById(courseId)
    .select('reviews')
    .exec(function(err, course) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding course");
        response.status = 500;
        response.message = err;
      } else if(!course) {
        console.log("course id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "course ID not found " + id
        };
      } else {
        // Get the review
        thisReview = course.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisReview.name = req.body.name;
        thisReview.rating = parseInt(req.body.rating, 10);
        thisReview.review = req.body.review;
        course.save(function(err, courseUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });

};
