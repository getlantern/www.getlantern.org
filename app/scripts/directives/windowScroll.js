'use strict';

angular.module('lantern_www')
    .directive("scrollClass", function ($window) {
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
                     } else {
                         //scope.boolChangeClass = false;
                         element.removeClass(scope.scrollClass);
                     }
                    scope.$apply();
                });
            }
        };
    });