'use strict';

angular.module('lantern_www')
    .directive("scrollClass", ['$window', function ($window) {
        return {
            scope: {
                scrollClass: "@",
                offset: "="
            },
            link: function(scope, element, attrs) {
                angular.element($window).bind("scroll", function() {
                     if (this.pageYOffset >= scope.offset) {
                         //scope.boolChangeClass = true;
                         element.addClass(scope.scrollClass);
                         angular.element('.sphinxsidebarwrapper').addClass('enclosed');
                     } else {
                         //scope.boolChangeClass = false;
                         element.removeClass(scope.scrollClass);
                         angular.element('.sphinxsidebarwrapper').removeClass('enclosed');
                     }
                    scope.$apply();
                });
            }
        };
    }]);
