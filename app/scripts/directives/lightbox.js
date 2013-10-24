'use strict';

angular.module('GetLanternSiteApp')
  .directive('lightbox', ['$rootScope', function ($rootScope) {
    return function (scope, element) {
      $rootScope.lightbox = element;
    };
  }])
  .directive('lightboxClose', ['$rootScope', function ($rootScope) {
    return function (scope, element) {
      element.bind('click', function () {
        var $lightbox = $rootScope.lightbox;
        $lightbox.addClass('hide');
      });
    };
  }]);
