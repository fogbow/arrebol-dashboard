'use strict';

/**
 * @ngdoc overview
 * @name mulunguApp
 * @description
 * # mulunguApp
 *
 * Main module of the application.
 */
angular
  .module('mulunguApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'JobsCtrl',
        controllerAs: 'jobs'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
