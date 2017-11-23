angular.module('newnglms').factory('groupDataFactory', groupDataFactory);

function groupDataFactory($http) {
  return {
    groupList: groupList,
  };

  function groupList() {
    return $http.get('/api/groups').then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}
