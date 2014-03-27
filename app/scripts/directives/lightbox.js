'use strict';

angular.module('lantern_www')
  .directive('lightbox', ['$rootScope', function ($rootScope) {
    return function (scope, element) {
      $rootScope.lightbox = element;
    };
  }])
  .directive('lightboxClose', ['$rootScope', '$window', function ($rootScope, $window) {
    return function (scope, element) {
      element.bind('click', function () {
        var $lightbox = $rootScope.lightbox;
        $lightbox.addClass('hide');
        $window.player.pauseVideo();
      });
    };
  }]);
  
// $(document).ready(function () {
//    setTimeout(function(){
//        $('#modalButton').click();
//    }, 5000);
// });