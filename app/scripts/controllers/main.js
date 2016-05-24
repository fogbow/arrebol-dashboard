'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolApp')
  .controller('JobsCtrl', function () {
    var vm = this;
    vm.status = ['READY', 'WAITING', 'SUCCESS', 'FAILED'];
    vm.job = {
      id: '53de430e-2f0a-4931-9c49-6871210c1f4b',
      text: 'job1',
      tasks: []
    };
    var add = function() {
      var number = Math.floor(Math.random() * (100 - 1));
      var status = Math.floor(Math.random() * 4);
      var task = {
        id: 'Task'+number,
        text: 'Description for task number '+number,
        taskState: vm.status[status]
      };
      vm.job.tasks.push(task);
    };
    for (var i=0; i<10;i++) {
      add();
    }
  });
