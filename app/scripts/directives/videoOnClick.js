'use strict';

angular.module('GetLanternSiteApp')
  .directive('videoOnClick', ['$rootScope', '$translate', 'constants', function ($rootScope, $translate, constants) {
    return function (scope, element) {
      element.bind('click', function () {
        var $lightbox = $rootScope.lightbox,
            lightbox = $lightbox[0],
            $container = $lightbox.find('div'),
            container = $container[0];
        $lightbox.removeClass('hide');
        var width = container.scrollWidth,
            height = container.scrollHeight;
        $container.html(
          '<iframe id="ytplayer" type="text/html" width="'+width+'" height="'+height+'" '+
          'src="https://www.youtube.com/embed/4TY4IVnMO98?origin=getlantern.org&'+
          'autoplay=1&enablejsapi=1&rel=0&showinfo=0&autohide=1'+
          (width >= 1080 ? '&vq=hd1080' : (width >= 720 ? '&vq=hd720' : ''))+
          ('en' === $translate.uses().substring(0, 2) ? '' : '&cc_load_policy=1')+
          '" frameborder="0" allowfullscreen>'
        );
      });
    };
  }]);
