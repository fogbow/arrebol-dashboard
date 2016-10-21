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
      if(vm.job.Tasks){
        vm.job.Tasks.forEach(function(item, index){
          if(item.state === 'READY'){
            item.sccStyle = 'task-status-ready';
          }
          else if(item.state === 'RUNNING'){
            item.sccStyle = 'task-status-running';
          }
          else if(item.state === 'COMPLETED'){
            item.sccStyle = 'task-status-completed';
          }
          else if(item.state === 'FAILED'){
            item.sccStyle = 'task-status-failed';
          }
          else{
            item.sccStyle = 'task-status-default';
          }
        });
      }
    }, function(error) {
      toastr.error('Error code: ' + error.code + ', Description: ' + error.description, 'Error while trying to fetch tasks of job ID: ' + vm.jobId + '.');
    });
  });