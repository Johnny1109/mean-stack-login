angular.module('newnglms').controller('RegisterController', RegisterController);

function RegisterController($http) {
  var vm = this;

  vm.register = function() {
    var user = {
      
      email: vm.email,
      firstname: vm.firstname,
      lastname: vm.lastname,
	  occupation:vm.occupation,
	  company:vm.company,
	  region:vm.region,
	  address:vm.address,
	  city:vm.city,
	  state:vm.state,
	  zip:vm.zip,
	  country:vm.country,
	  phone:vm.phone,
	  type:"normal",
      password: vm.password
    };
	//alert(vm.username+" : "+vm.email+" : "+vm.password+" : "+vm.passwordRepeat);
	
    if (!vm.email || !vm.password ) {
		
      vm.error = 'Please add a email and a password.';
	  
    } else {
      if (vm.password !== vm.passwordRepeat) {
        vm.error = 'Please make sure the passwords match.';
      } else {
        $http.post('/api/users/register', user).then(function(result) {
          console.log(result);
          vm.message = 'Successful registration, please login.';
          vm.error = '';
        }).catch(function(error) {
			alert(error)
          console.log(error);
        });
      }
    }
  }
};
