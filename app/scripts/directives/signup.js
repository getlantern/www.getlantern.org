'use strict';

angular.module('GetLanternSiteApp')
  .directive('signupForm', ['$http', '$window', 'constants', function ($http, $window, constants) {
    return function (scope, element) {
      var form = element[0],
          // requires session.js
          isMobile = $window.session && $window.session.device && $window.session.device.is_mobile;
      form.action = constants.SIGNUP_URL;
      form.target = isMobile ? '_self' : 'formResult';

      scope.handleSignup = function () {
        if (scope.signupForm.$invalid) {
          return;
        }
        if (!isMobile) {
          $window.open(form.action, form.target, 'scrollbars=no,menubar=no,height=660,width=800,resizable=yes,toolbar=no,status=no');
        }
        form.submit();
      };
    };
  }]);

