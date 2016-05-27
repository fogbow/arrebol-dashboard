'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolApp')
  .controller('MainCtrl', function ($http) {
    var vm = this;
    vm.jobs = [];
    vm.search = "";
    $http.get('scripts/jobs.json')
      .success(function(data) {
        vm.jobs = data.Jobs;
      });
  });
