'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:TaskCtrl
 * @description
 * # TaskCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolApp')
  .controller('TasksCtrl', function ($http) {
    var vm = this;
    vm.job = {};
    vm.search = "";
    $http.get('scripts/tasks.json')
      .success(function(data) {
        vm.job = data;
      });
  });
