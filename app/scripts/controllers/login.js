'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolApp')
  .controller('LoginCtrl', function ($http, $routeParams, $location, arrebolConfig, toastr) {
    /* global jQuery */
    var vm = this;
    vm.authType = 'commonauth';
    $http.get(arrebolConfig.arrebolServiceBaseUrl + '/arrebol/authenticator')
        .success(function(authType) {
          vm.authType = authType;
          jQuery('.' + authType.trim()).show();
        }).error(function (error) {
          toastr.error('Error code: ' + error.code + ', Description: ' + error.description, 'Error while trying to connect to arrebol server.');
        });
    vm.doLogin = function() {
      if (vm.authType === 'commonauth') {
        var file = document.getElementById('privateKey').files[0];
        if (file) {
           var reader = new FileReader();
           reader.readAsText(file, 'UTF-8');
           reader.onload = function (evt) {
            if (evt.target.result === '') {
              toastr.error('The private key file is empty.', 'Error while trying to log in.');
            } else {
              if (typeof(Storage) !== 'undefined') {
                sessionStorage.authType = vm.authType;
                sessionStorage.loggedUser = vm.username;
                sessionStorage.loggedPassword = evt.target.result;
              }
            }
            $location.path( '/' );
           };
           reader.onerror = function () {
            toastr.error('Could not load the public key file.', 'Error while trying to log in.');
           };
        } else {
          toastr.error('Please, select the public key file.', 'Error while trying to log in.');
        }
      } else if (vm.authType === 'ldapauth') {
        if (vm.ldapUsername === '') {
          toastr.error('Username and password cannot be empty.', 'Error while trying to log in.');
        } else {
          if (typeof(Storage) !== 'undefined') {
            sessionStorage.authType = vm.authType;
            sessionStorage.loggedUser = vm.ldapUsername;
            sessionStorage.loggedPassword = vm.ldapPassword;
          }
          $location.path( '/' );
        }
      }
    };
  });
