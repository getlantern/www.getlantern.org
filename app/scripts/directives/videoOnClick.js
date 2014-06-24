'use strict';

angular.module('lantern_www')
  .directive('videoOnClick', ['$rootScope', '$translate', '$window', 'constants', function ($rootScope, $translate, $window, constants) {

    var autoPlay = false;
    if ($window.session) {
      // only autoplay when not on iOS to prevent blocking playback
      // (see https://github.com/getlantern/www.getlantern.org/issues/31)
      autoPlay = !/(iPhone|iPod|iPad)/.test($window.session.browser.os);
    }

    function maybePlayVideo() {
      if ($window.player && autoPlay) {
        $window.player.playVideo();
      }
    }

    return function (scope, element) {
      element.bind('click', function () {
        var $lightbox = $rootScope.lightbox;
        $lightbox.removeClass('hide');

        if ($rootScope.initializedVideo) {
          maybePlayVideo();
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
                autoplay: +autoPlay, // + converts bool to 0 or 1 if false or true respectively
                cc_load_policy: +('en' !== $translate.use().substring(0, 2)),
                controls: 2,
                enable_js_api: 1,
                origin: 'getlantern.org',
                rel: 0,
                showinfo: 0
              },
              events: {onReady: $window.onPlayerReady}
            });
          };

          $window.onPlayerReady = function (event) {
            maybePlayVideo();
          };

          $rootScope.initializedVideo = true;
        }
      });
    };
  }]);
