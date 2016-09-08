'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolApp')
  .controller('MainCtrl', ['$http', 'hex2a', 'arrebolConfig', function ($http, hex2a, arrebolConfig) {
    var vm = this;
    vm.jobs = [];
    vm.search = '';
    vm.stopJob = function(jobID) {
      if (window.confirm('Do you want to stop the job ' + jobID + ' ?')) {
        $http.get(arrebolConfig.arrebolServiceBaseUrl + '/arrebol/nonce')
        .success(function(nonce) {
          var username = sessionStorage.loggedUser;
          var privateKey = sessionStorage.privateKey;
          /*global RSAKey */
          var rsa = new RSAKey();
          rsa.readPrivateKeyFromPEMString(privateKey);
          var hash = rsa.signString(username + nonce, 'sha1');
          hash = hex2a(hash);
          hash = window.btoa(hash);
          $http.delete(arrebolConfig.arrebolServiceBaseUrl + '/arrebol/job/' + jobID, {headers: { 'X-auth-nonce': nonce, 'X-auth-username': username, 'X-auth-hash': hash } })
          .success(function(data) {
            if (data === jobID) {
              document.getElementById('container-' + jobID).remove();
            }
          }).error(function (error) {
            console.log(error);
          });
        });
      }
    };
    $http.get(arrebolConfig.arrebolServiceBaseUrl + '/arrebol/nonce')
      .success(function(nonce) {
        var username = sessionStorage.loggedUser;
        var privateKey = sessionStorage.privateKey;
        /*global RSAKey */
        var rsa = new RSAKey();
        rsa.readPrivateKeyFromPEMString(privateKey);
        var hash = rsa.signString(username + nonce, 'sha1');
        hash = hex2a(hash);
        hash = window.btoa(hash);
        $http.get(arrebolConfig.arrebolServiceBaseUrl + '/arrebol/job', {headers: { 'X-auth-nonce': nonce, 'X-auth-username': username, 'X-auth-hash': hash } })
	      .success(function(data) {
	        vm.jobs = data.Jobs;
	      }).error(function (error) {
          console.log(error);
        });
      });
  }]);
