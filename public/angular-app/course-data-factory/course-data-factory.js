angular.module('newnglms').factory('courseDataFactory', courseDataFactory);

function courseDataFactory($http) {
  return {
    courseList: courseList,
    courseDisplay: courseDisplay,
    courseUpdate: courseUpdate,
    postReview: postReview
  };

  function courseList() {
    return $http.get('/api/courses?count=10').then(complete).catch(failed);
  }
  
  function courseDisplay(id) {
    return $http.get('/api/courses/' + id).then(complete).catch(failed);
  }

  function courseUpdate(id) {
	  console.log("course id >> "+id);
    return $http.put('/api/courses/' + id).then(complete).catch(failed);
  }
  function postReview(id, review) {
    return $http.post('/api/courses/' + id + '/reviews', review).then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}
