'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:TaskCtrl
 * @description
 * # TaskCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolApp')
  .controller('TasksCtrl', function ($http, $routeParams) {
    var vm = this;
    vm.job = {};
    vm.search = "";
    vm.jobId = $routeParams.job;
    $http.get('scripts/tasks.json')
      .success(function(data) {
        vm.job = data;
      });
  });
