'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolControllers').controller(
  'AuthCtrl',
  function ($rootScope, $scope, $location, AuthenticationService) {

    $scope.username = undefined;
    $scope.password = undefined;

    $scope.doLogin = function () {
      AuthenticationService.basicSessionLogin($scope.username, $scope.password,
        function () {
          $location.path('/tasks');
        },
        function (error) { //Erro call back
          console.log('Login error: ' + JSON.stringify(error));
        }
      );
    };

    $scope.getUsername = function() {
      return AuthenticationService.getUsername();
    }

    $scope.doLogout = function () {
      AuthenticationService.doLogout();
      $scope.username = undefined;
      $location.path('/');
    }
  }
);
