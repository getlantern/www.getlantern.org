'use strict';

angular.module('GetLanternSiteApp')
  .controller('RootCtrl', ['$scope', 'constants', function ($scope, constants) {
    $scope.constants = constants;
  }]);
