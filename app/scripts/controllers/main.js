'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolApp')
  .controller('MainCtrl', ['$http', 'hex2a', 'arrebolConfig', 'toastr', 'ArrebolApi', function ($http, hex2a, arrebolConfig, toastr, ArrebolApi) {
    var vm = this;
    vm.jobs = [];
    vm.search = '';
    vm.loggedUser = '';
    vm.loggedPassword = '';
    vm.authType = '';
    if (typeof(Storage) !== 'undefined') {
      vm.authType = sessionStorage.authType;
      vm.loggedUser = sessionStorage.loggedUser;
      vm.loggedPassword = sessionStorage.loggedPassword;
    }

    vm.stopJob = function(jobID) {
      if (window.confirm('Do you want to stop the job ' + jobID + ' ?')) {
        ArrebolApi.deleteJob(jobID, vm.authType, vm.loggedUser, vm.loggedPassword, function (data) {
          if (data === jobID) {
            toastr.success('The job ID ' + jobID + ' was stopped.', 'Job stopped');
            document.getElementById('container-' + jobID).remove();
          }
        }, function (error) {
          toastr.error('Error code: ' + error.code + ', Description: ' + error.description, 'Error while trying to stop job ID: ' + jobID + '.');
        });
      }
    };
    
    ArrebolApi.getJobs(vm.authType, vm.loggedUser, vm.loggedPassword, function(data) {
      vm.jobs = data.Jobs;
      toastr.info(data.Jobs.length + ' jobs found. ', 'Jobs list updated.');
    }, function(error) {
      toastr.error('Error code: ' + error.code + ', Description: ' + error.description, 'Error while trying to fetch jobs.');
    });
    
  }]);
