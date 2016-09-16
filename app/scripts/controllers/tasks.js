'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:TaskCtrl
 * @description
 * # TaskCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolApp')
  .controller('TasksCtrl', function ($http, $routeParams, hex2a, arrebolConfig, toastr, ArrebolApi) {
    var vm = this;
    vm.jobs = [];
    vm.search = '';
    vm.loggedUser = '';
    vm.loggedPassword = '';
    vm.authType = '';
    vm.jobId = $routeParams.job;

    if (typeof(Storage) !== 'undefined') {
      vm.authType = sessionStorage.authType;
      vm.loggedUser = sessionStorage.loggedUser;
      vm.loggedPassword = sessionStorage.loggedPassword;
    }

    ArrebolApi.getJob(vm.jobId, vm.authType, vm.loggedUser, vm.loggedPassword, function(data) {
      vm.job = data;
    }, function(error) {
      toastr.error('Error code: ' + error.code + ', Description: ' + error.description, 'Error while trying to fetch tasks of job ID: ' + vm.jobId + '.');
    });
  });
