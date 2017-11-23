var express = require('express');
var router = express.Router();

var ctrlCourses = require('../controllers/courses.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
var ctrlGroups = require('../controllers/groups.controllers.js');

// Course routes
router
  .route('/courses')
  .get(ctrlCourses.coursesGetAll)
  .post(ctrlCourses.coursesAddOne);

router
  .route('/courses/:courseId')
  .get(ctrlCourses.coursesGetOne)
  .put(ctrlCourses.coursesUpdateOne);


// Review routes
router
  .route('/courses/:courseId/reviews')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlUsers.authenticate, ctrlReviews.reviewsAddOne);

router
  .route('/courses/:courseId/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne)
  .put(ctrlReviews.reviewsUpdateOne);

//All Users
router
  .route('/users')
  .get(ctrlUsers.usersGetAll);
   
  //All Users
router
  .route('/groups')
  .get(ctrlGroups.groupsGetAll);
   
  
// Authentication
router
  .route('/users/register')
  .post(ctrlUsers.register);

  router
    .route('/users/login')
    .post(ctrlUsers.login);

module.exports = router;
