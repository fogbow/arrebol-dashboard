'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolApp')
  .controller('LoginCtrl', function ($http, $routeParams, $location) {
    var vm = this;
    vm.doLogin = function() {
      var file = document.getElementById('privateKey').files[0];  
      if (file) {
         var reader = new FileReader();
         reader.readAsText(file, 'UTF-8');
         reader.onload = function (evt) {
          if (evt.target.result === '') {
            window.alert('The private key file is empty.');
          } else {
            if (typeof(Storage) !== 'undefined') {
              sessionStorage.loggedUser = vm.username;
              sessionStorage.privateKey = evt.target.result;
            }
          }
          $location.path( '/' );
         };
         reader.onerror = function () {
          console.log('Could not load the public key file.');
         };
      } else {
        window.alert('Please, select the public key file.');
      }
    };
  });
