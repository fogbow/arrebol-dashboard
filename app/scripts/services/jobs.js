'use strict';

/**
 * @ngdoc service
 * @name ArrebolApp.jobs
 * @description
 * # jobs
 * Factory in the ArrebolApp.
 */
angular.module('ArrebolApp')
  .factory('jobs', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
