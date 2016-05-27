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
    $http.get("http://web.cloud.lsd.ufcg.edu.br:42020/api/arrebol/job")
      .success(function(data) {
        vm.jobs = data.Jobs;
      });
  });
