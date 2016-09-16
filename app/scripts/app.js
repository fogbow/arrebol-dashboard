'use strict';

/**
 * @ngdoc overview
 * @name ArrebolApp
 * @description
 * # ArrebolApp
 *
 * Main module of the application.
 */
angular
  .module('ArrebolApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'toastr'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'Jobs'
      })
      .when('/tasks/:job', {
        templateUrl: 'views/tasks.html',
        controller: 'TasksCtrl',
        controllerAs: 'Tasks'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'Login'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run( function($rootScope, $location) {
    // register listener to watch route changes
    $rootScope.$on( '$routeChangeStart', function(event, next) {
      var loggedUser = false;
      if (typeof(Storage) !== 'undefined') {
        if (sessionStorage.loggedUser && sessionStorage.loggedPassword) {
          loggedUser = true;
        }
      }
      if ( !loggedUser ) {
        // no logged user, we should be going to #login
        if ( next.templateUrl === 'views/login.html' ) {
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path( '/login' );
        }
      } else {
        if ( next.templateUrl === 'views/login.html' ) {
          $location.path( '/' );
        }
      }
    });
  });
