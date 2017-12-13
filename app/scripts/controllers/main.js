'use strict';

/**
 * @ngdoc function
 * @name ArrebolApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ArrebolApp
 */
angular.module('ArrebolControllers').controller(
  'MainCtrl',
  function ($rootScope, $scope, $uibModal, TasksService) {

    $scope.jobs = [];
    $scope.search = [];
    $scope.alerts = [];

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.updateTaskList = function () {
      var successCallback = function (data) {
        $scope.jobs = data.Jobs;
      };
      var failCallback = function (error) {
        console.log(error);
      };
      TasksService.getTasksList(successCallback, failCallback);
    };
    $scope.updateTaskList();

    $scope.openSubmissionModal = function () {
      var modalInstance = $uibModal.open(
        {
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'myModalContent.html',
          controller: 'SubmissionModalCtrl'
        }
      );
      modalInstance.result.then(
        function (submited) {
          $scope.updateTaskList();
          if (submited) {
            $scope.alerts.push(
              {
                msg: 'Job submitted.',
                type: 'success'
              }
            );
          }
        },
        function (error) {
          $scope.updateTaskList();
          $scope.alerts.push(
            {
              msg: error,
              type: 'danger'
            }
          );
        }
      )
    }
  }
);

angular.module('ArrebolControllers').controller(
  'SubmissionModalCtrl',
  function ($scope, $uibModalInstance, TasksService) {
    $scope.jdffile = undefined;

    $scope.fileChanged = function (element) {
      $scope.jdffile = element.files[0];
    };

    $scope.clearJDF = function () {
      $scope.jdffile = undefined;
    };

    $scope.submitJDF = function () {
      if ($scope.jdffile === undefined) {
        return;
      }
      var successCallback = function (response) {
        $scope.clearJDF();
        $uibModalInstance.close(true);
      };
      var errorCallback = function (error) {
        console.log(error);
        $scope.clearJDF();
        $uibModalInstance.dismiss(error.data);
      };
      TasksService.uploadFile($scope.jdffile, successCallback, errorCallback);
    };

    $scope.closeModal = function () {
      $scope.clearJDF();
      $uibModalInstance.close(false);
    }
  }
);