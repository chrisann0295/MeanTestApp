// angular.module('app.routes', ['ngRoute'])

//   .config(function ($routeProvider, $locationProvider) {
//     $routeProvider

//       .when('/', {
//         templateUrl: 'app/views/pages/home.html'
//       // , controller: 'homeController'
//       // , controllerAs: 'home'
//       })

//       // .when('/about', {
//       //   templateUrl: 'views/pages/about.html'
//       // , controller: 'aboutController'
//       // , controllerAs: 'about'
//       // })

//       // .when('/contact', {
//       //   templateUrl: 'views/pages/contact.html'
//       // , controller: 'contactController'
//       // , controllerAs: 'contact'
//       // })

//     $locationProvider.html5Mode(true)
//   })

angular.module('app.routes', ['ngRoute'])

 .config(function($routeProvider, $locationProvider) {

 $routeProvider

 // home page route
 .when('/', {
 templateUrl : 'app/views/pages/home.html'
 });

 // get rid of the hash in the URL
 $locationProvider.html5Mode(true);

 });


 