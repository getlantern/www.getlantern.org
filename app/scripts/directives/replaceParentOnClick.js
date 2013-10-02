'use strict';

angular.module('GetLanternSiteApp')
  .directive('replaceParentOnClick', function () {
    return function (scope, element) {
      var parent = element.parent();
      element.bind('click', function () {
        parent.html(scope.replacingHtml);
      });
    };
  });
