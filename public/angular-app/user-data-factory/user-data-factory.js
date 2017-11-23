angular.module('newnglms').factory('userDataFactory', userDataFactory);

function userDataFactory($http) {
  return {
    userList: userList,
  };

  function userList() {
    return $http.get('/api/users?count=10').then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}
