angular.module('newnglms').controller('CoursesController', CoursesController);

function CoursesController($route, $routeParams, courseDataFactory, userDataFactory, groupDataFactory) {
	var vm = this;
	var vm1 = this;
	
	vm.title = 'NGLMS App';

	var id = $routeParams.id;
	
	vm.show = 1;
	
	//alert("ID >>> "+id)
	courseDataFactory.courseList().then(function(response) {
		// console.log(response);
		vm.show = 1;
		vm.courses = response.data;
		
	});
	userDataFactory.userList().then(function(response) {
		
		
		vm1.users = response.data;
		console.log("user response : "+JSON.stringify(vm1.users));
		
	});
	
	
	groupDataFactory.groupList().then(function(response) {
		
		
		//vm1.groups = response.data;
		//console.log("groups response : "+JSON.stringify(response.data));
		
	});
	
	
/* 	vm.addGroup = function() {
		var group = {
      name: "Ericsson India",
      status: "Active"
      
    }; 
		$http.post('/api/groups/addgroup', group).then(function(result) {
          console.log(result);
          vm.message = 'Successfully added the group!';
          vm.error = '';
        }).catch(function(error) {
          console.log(error);
        });
		
	} */
	
}
