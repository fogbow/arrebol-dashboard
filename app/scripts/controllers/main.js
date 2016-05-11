'use strict';

/**
 * @ngdoc function
 * @name mulunguApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mulunguApp
 */
angular.module('mulunguApp')
  .controller('JobsCtrl', function () {
    this.job = {
      id: '53de430e-2f0a-4931-9c49-6871210c1f4b',
      text: 'job1',
      tasks: [
        {
          id: 'TaskNumber0',
          text: 'Task number zero',
          taskState: 'READY'
        },
        {
          id: 'TaskNumber1',
          text: 'Task number one',
          taskState: 'READY'
        }
      ]
    };
  });
