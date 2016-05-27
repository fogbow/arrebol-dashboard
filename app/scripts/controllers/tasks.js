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
    $http.get("http://web.cloud.lsd.ufcg.edu.br:42020/api/arrebol/job/"+vm.jobId)
      .success(function(data) {
        vm.job = data;
      });
  });
