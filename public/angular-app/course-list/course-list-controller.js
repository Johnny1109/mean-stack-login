angular.module('newnglms').controller('CoursesController', CoursesController);

function CoursesController(courseDataFactory) {
  var vm = this;
  vm.title = 'NGLMS App';
  courseDataFactory.courseList().then(function(response) {
    // console.log(response);
    vm.courses = response.data;
  });
}
