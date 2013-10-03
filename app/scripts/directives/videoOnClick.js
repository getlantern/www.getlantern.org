'use strict';

angular.module('GetLanternSiteApp')
  .directive('videoOnClick', ['$translate', 'constants', function ($translate, constants) {
    return function (scope, element) {
      var container = element.parent(),
          children = container.children(),
          snapshot = children[0];

      element.bind('click', function () {
        var width = snapshot.width,
            height = snapshot.height;
        container.html(
          '<iframe id="ytplayer" type="text/html" width="'+width+'" height="'+height+'" '+
          'src="https://www.youtube.com/embed/aiPkCugE-RY?origin=www.getlantern.org&'+
          'autoplay=1&enablejsapi=1&rel=0&showinfo=0&autohide=1'+
          (width >= 1080 ? '&vq=hd1080' : (width >= 720 ? '&vq=hd720' : ''))+
          ('en' === $translate.uses().substring(0, 2) ? '' : '&cc_load_policy=1')+
          '" frameborder="0" allowfullscreen>'
        );
        snapshot = playButton = null;
      });
    };
  }]);
