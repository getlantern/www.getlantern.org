'use strict';

angular.module('GetLanternSiteApp')
  .directive('signupForm', ['$http', '$window', function ($http, $window) {
    var action = 'https://getlantern.us2.list-manage.com/subscribe/post?u=0ac18298d5d0330dcda8f48aa&id=f06770f311';
    var target = 'formResult';

    return function (scope, element) {
      var form = element[0];
      scope.handleSignup = function () {
        if (scope.signupForm.$invalid) {
          return;
        }
        form.action = action;
        form.target = target;
        $window.open(form.action, form.target, 'scrollbars=no,menubar=no,height=660,width=800,resizable=yes,toolbar=no,status=no');
        form.submit();
      };
    };
  }]);

