'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolApp')
  .controller('MainCtrl', ['$http', 'hex2a', function ($http, hex2a) {
    var vm = this;
    vm.jobs = [];
    vm.search = '';
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
        $http.get('http://arrebol/api/arrebol/job', {headers: { 'X-auth-nonce': nonce, 'X-auth-username': username, 'X-auth-hash': hash } })
	      .success(function(data) {
	        vm.jobs = data.Jobs;
	      }).error(function (error) {
          console.log(error);
        });
      });
  }]);
