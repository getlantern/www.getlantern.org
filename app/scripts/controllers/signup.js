'use strict';

angular.module('lantern_www')
  .controller('SignupCtrl', ['$scope',"$timeout",
      function ($scope, $timeout) {
          console.log("loaded sign up controller")
          $scope.title="some title";
          $scope.mc_email_class = "current";
          $scope.mc_region_class = "";
          
          $scope.onEmailSubmit = function(){
            $scope.mc_email_class = "";
            
            $timeout(function(){
                $scope.mc_region_class = "current";
            },500);
          };
          
          $scope.onRegionSubmit = function(){
              $scope.mc_region_class = "";
              
              $timeout(function(){
                $scope.mc_list_class = "current";
            },500);
          }
    }]);