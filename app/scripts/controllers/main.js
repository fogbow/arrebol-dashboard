'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolControllers').controller(
  'MainCtrl',
  function ($rootScope, $scope, TasksService) {

    $scope.jobs = [];
    $scope.search = [];

    $scope.updateTaskList = function() {
      var successCallback = function (data) {
        $scope.jobs = data.Jobs;
      };
      var failCallback = function (error) {
        console.log(error);
      };
      TasksService.getTasksList(successCallback, failCallback);
    };
    $scope.updateTaskList();

    $scope.fileChanged = function (element) {
      Array.from(element.files).forEach(
        function (jdffile) {
          var successCallback = function(response) {
            console.log(jdffile.name + " sent successfully.");
            $scope.updateTaskList();
          };
          var errorCallback = function(error) {
            console.log(error);
          };
          TasksService.uploadFile(jdffile, successCallback, errorCallback);
        }
      );
    }
  }
);
