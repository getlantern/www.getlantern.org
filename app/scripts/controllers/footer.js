'use strict';

angular.module('GetLanternSiteApp')
  .controller('FooterCtrl', ['$scope', function ($scope) {
    $scope.navLinks = [
      {key: 'LINKTEXT_FORUMS', url: 'https://groups.google.com/group/lantern-users-en'},
      {key: 'LINKTEXT_DOCS', url: 'https://github.com/getlantern/lantern/wiki'},
      {key: 'LINKTEXT_DEVELOPERS', url: 'https://github.com/getlantern/lantern'}
    ];
  }]);
