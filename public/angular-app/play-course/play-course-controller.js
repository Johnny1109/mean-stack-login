angular.module('newnglms').controller('CourseController', CourseController);

function CourseController($route, $sce, $routeParams, $scope, $window, courseDataFactory, AuthFactory, $locationProvider) {
  var vm = this;
  var id = $routeParams.id;
  vm.isSubmitted = false;
  $locationProvider.html5Mode(true);   
  courseDataFactory.courseDisplay(id).then(function(response) {
    vm.course = response.data;
	$scope.videourl = $sce.trustAsResourceUrl(vm.course.url);
    //vm.stars = _getStarRating(response.data.stars);
  });

  function _getStarRating(stars) {
    return new Array(stars);
  }

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

 /*  vm.addReview = function() {

    var token = jwtHelper.decodeToken($window.sessionStorage.token);
    var username = token.username;

    var postData = {
      name: username,
      rating: vm.rating,
      review: vm.review
    };
    if (vm.reviewForm.$valid) {
      courseDataFactory.postReview(id, postData).then(function(response) {
        if (response.status === 200) {
          $route.reload();
        }
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      vm.isSubmitted = true;
    }
  }; */

}
