// angular.module('mainCtrl', [])

//   .controller('mainController', function ($rootScope, $location, Auth) {

//     var vm = this
    
//     vm.loggedIn = Auth.isLoggedIn() //check if user is logged in

//     $rootScope.$on('$routeChangeStart', function () {
//       vm.loggedIn = Auth.isLoggedIn()

//     //Get user information on  route change
//     Auth.getUser()
//       .sucess(function (data) {
//         vm.user = data
//       })
//     })

//     vm.doLogin = function () {
//       //Call the Auth login
//       Auth.login(vm.loginData.username, vm.loginData.password)

//         .sucess(function (data) {
//           //if a user successfully logs in, redirect to users page
//           $location.path('/users')
//         })
//     }

//     vm.doLogout = function() {
//       vm.user = {}
//       $location.path('/login')
//     }

//   })

angular.module('mainCtrl', [])

 .controller('mainController', function($rootScope, $location, Auth) {

 var vm = this;

 // get info if a person is logged in
 vm.loggedIn = Auth.isLoggedIn();

 // check to see if a user is logged in on every request
 $rootScope.$on('$routeChangeStart', function() {
 vm.loggedIn = Auth.isLoggedIn();

 // get user information on route change
 Auth.getUser()
 .success(function(data) {
 vm.user = data;
 });
 });

 // function to handle login form
 vm.doLogin = function() {

 // call the Auth.login() function
 Auth.login(vm.loginData.username, vm.loginData.password)
 .success(function(data) {

 // if a user successfully logs in, redirect to users page
 $location.path('/users');
 });
 };
 // function to handle logging out
 vm.doLogout = function() {
 Auth.logout();
 // reset all user info
 vm.user = {};
 $location.path('/login');
 };

 });