'use strict';

 
angular.module('lantern_www').controller('ModalInstanceCtrl', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

}]);                                   

angular.module('lantern_www')
    .controller('CensoredPopupCtrl', ['$scope', '$modal', '$log',
        function ($scope, $modal, $log) {
    
    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'censored.html',
            controller: 'ModalInstanceCtrl',
            size: size,
        });
    };
}]);
