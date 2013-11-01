'use strict';

angular.module('GetLanternSiteApp')
  .directive('videoOnClick', ['$rootScope', '$translate', '$window', 'constants', function ($rootScope, $translate, $window, constants) {
    return function (scope, element) {
      element.bind('click', function () {
        var $lightbox = $rootScope.lightbox;
        $lightbox.removeClass('hide');

        if ($rootScope.initializedVideo) {
          $window.player.playVideo();
        } else {
          var lightbox = $lightbox[0],
              $container = $lightbox.find('div'),
              container = $container[0],
              width = container.scrollWidth,
              height = container.scrollHeight,
              ytScriptTag = document.createElement('script'),
              firstScriptTag = document.getElementsByTagName('script')[0];

          ytScriptTag.src = 'https://www.youtube.com/iframe_api';
          firstScriptTag.parentNode.insertBefore(ytScriptTag, firstScriptTag);

          $window.onYouTubeIframeAPIReady = function () {
            $window.player = new $window.YT.Player('player', {
              height: height,
              width: width,
              videoId: '4TY4IVnMO98',
              playerVars: {
                autohide: 1,
                autoplay: 1,
                cc_load_policy: 'en' === $translate.uses().substring(0, 2) ? 0 : 1,
                origin: 'getlantern.org',
                rel: 0,
                showinfo: 0
              },
              events: {onReady: $window.onPlayerReady}
            });
          };

          $window.onPlayerReady = function (event) {
            event.target.playVideo();
          };

          $rootScope.initializedVideo = true;
        }
      });
    };
  }]);
