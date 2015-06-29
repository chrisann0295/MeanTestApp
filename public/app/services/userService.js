angular.module('userService', [])

.factory('User', function($http) {
  // create the object
  var userFactory = {}

  //Get a single user
  userFactory.get = function(id) {
    return $http.get('/api/users' + id)
  }

  //Get all users
  userFactory.all = function() {
    return $http.get('/api/users')
  }

  //Creating a user
  userFactory.create = function(userData) {
    return $http.post('/api/users', userData)
  }

  //Updating a user
  userFactory.update = function(id, userData) {
    return $http.put('api/users/' + id, userData)
  }

  //Deleting a user
  userFactory.delete = function(id) {
    return $http.delete('api/users' + id)
  }

  // return the Factory object

  return userFactory
   
 })