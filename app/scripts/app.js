'use strict';

angular.module('lantern_www', [
    'ngCookies',
    'ngSanitize',
    'pascalprecht.translate',
    'ui.bootstrap.collapse'
  ],
  ['$translateProvider', 'constants', 'translations', function ($translateProvider, constants, translations) { // XXX can't get services like $log injected here :(
    angular.forEach(translations, function (transTable, langCode) {
      $translateProvider.translations(langCode, transTable);
    });
    $translateProvider.useCookieStorage();
    $translateProvider.preferredLanguage(
        __urlHashLang(constants.LANGS) ||
        negotiatedLang() ||
        constants.DEFAULT_LANGCODE);
    $translateProvider.fallbackLanguage(constants.DEFAULT_LANGCODE);
    
    function negotiatedLang() {
      // requires session.js
      var langPref = window.session && window.session.locale && window.session.locale.lang;
      if (!langPref) {
        return;
      }
      var countryPref = window.session.locale.country,
          bestMatch;
      for (var lc in constants.LANGS) {
        var split = lc.split('_'),
            langAvail = split[0];
        if (langAvail === langPref) {
          var countryAvail = angular.lowercase(split[1]);
          if (countryAvail === countryPref) {
            __log('exact match: '+lc);
            return lc;
          }
          // if we had access to the list of the browser's weighted preferences
          // we could do something smarter
          bestMatch = bestMatch || lc;
        }
      }
      __log('best match: '+bestMatch);
      return bestMatch;
    }

  }])
  .run(['$rootScope', '$translate', '$translateCookieStorage', '$window', 'constants', function ($rootScope, $translate, $translateCookieStorage, $window, constants) {
    if ($window.ga) {
      $window.ga('create', constants.GA_WEBPROP_ID);
      $window.ga('require', 'linkid', 'linkid.js');
      $window.ga('send', 'pageview');
    }

    var domain = angular.lowercase($window.location.hostname),
        domainType = constants.DOMAIN_TYPE_BY_DOMAIN[domain] || 'UNRECOGNIZED';
    __log('domain: ' + domain);
    __log('domain type: ' + domainType);
    $rootScope.domainType = domainType;
    if (domainType === 'CANONICAL' || domainType === 'MIRROR') {
      if ($window.location.protocol !== 'https:') {
        __log('redirecting to https...');
        $window.location.replace($window.location.href.replace(/^http:/, 'https:'));
      }
    } else if (domainType === 'UNRECOGNIZED') {
      __log('redirecting to official mirror...');
      $window.location.replace(constants.MIRROR_URL);
    }

    constants.NLANGS = Object.keys(constants.LANGS).length;
    angular.forEach(constants, function (value, key) {
      $rootScope[key] = value;
    });

    $rootScope.changeLang = function (langCode) {
      $rootScope.activeLang = constants.LANGS[langCode];
      $translate.uses(langCode);
    };

    var langOverride = __urlHashLang(constants.LANGS) || $translateCookieStorage.get($translate.storageKey());
    if (langOverride) {
      $rootScope.changeLang(langOverride);
    } else {
      $rootScope.activeLang = constants.LANGS[$translate.uses()];
    }

    $rootScope.valByLang = function (mapping) {
      return mapping[$rootScope.activeLang.code] ||
             mapping[constants.DEFAULT_LANGCODE];
    };
  }]);

function __log(msg) {
  if (window.console && window.console.debug) {
    window.console.debug(msg);
  }
}

// XXX would actually watch location.hash for changes and react but
// https://github.com/angular/angular.js/issues/4608
function __urlHashLang(langsAvail) {
  var hash = location.hash.substring(1);
  if (hash in langsAvail) {
    __log('hash: '+hash);
    return hash;
  }
}

function CollapseCtrl($scope) {
    $scope.isCollapsed = true;
    $scope.mc_form_input = "current";
}

var width = $(window).width(); 

$(window).on('resize', function(){
    var width = $(window).width(); 
});

if (width >= 875){
    
    $(function(){
      $('#logo-header').data('size','big');
    });
    
    $(window).scroll(function(){
      if($(document).scrollTop() > 0)
    {
        if($('#logo-header').data('size') == 'big')
        {
            $('#logo-header').data('size','small');
            $('#logo-header').stop().animate({
                height:'60px'
            },100);
            $('.site-logo').stop().animate({
                width:'300px',
                height:'80px'
            },100);
            $('.site-logo img').stop().animate({
                'margin':'-62px 0px 0px 0px',
            },100);
            $('#rally-banner').css({
                position:'static',
                float:'right'
            });
            $('#rally-banner h4').css({
                display:'inline',
                'font-size':'1.8em',
            });
            $('#rally-banner img').css({
                width:'100px',
            },100);
        }
    }
    else
      {
        if($('#logo-header').data('size') == 'small')
          {
            $('#logo-header').data('size','big');
            $('#logo-header').stop().animate({
                height:'160px'
            },100);
            $('.site-logo').stop().animate({
                width:'600px',
                height:'auto'
            },100);
            $('.site-logo img').stop().animate({
                'margin':'-98px 0px 0px -14%',
            },100);
            $('#rally-banner').css({
                position:'absolute',
            });
            $('#rally-banner h4').css({
                display:'block',
                'font-size':'2.2em'
            });
            $('#rally-banner img').css({
                width:'140px',
            },100);
          }  
      }
    });
}
    
