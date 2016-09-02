'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:TaskCtrl
 * @description
 * # TaskCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolApp')
  .controller('TasksCtrl', function ($http, $routeParams, hex2a) {
    var vm = this;
    vm.job = {};
    vm.search = '';
    vm.jobId = $routeParams.job;
    $http.get('http://arrebol/api/arrebol/nonce')
      .success(function(nonce) {
        var username = sessionStorage.loggedUser;
        var privateKey = sessionStorage.privateKey;
        /*global RSAKey */
        var rsa = new RSAKey();
        rsa.readPrivateKeyFromPEMString(privateKey);
        var hash = rsa.signString(username + nonce, 'sha1');
        hash = hex2a(hash);
        hash = window.btoa(hash);
        $http.get('http://arrebol/api/arrebol/job/' + vm.jobId, {headers: { 'X-auth-nonce': nonce, 'X-auth-username': username, 'X-auth-hash': hash } })
        .success(function(data) {
          vm.job = data;
        });
      });
  });
