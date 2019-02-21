var formCtr = angular.module("formCtr", []);
formCtr.controller('formController', function ($scope) {
    $scope.myVar = true;
    $scope.switchState = function () {
        $scope.myVar = !$scope.myVar;
    };
    $scope.reset = function () {
        $scope.memUser = '';
        $scope.memPass = '';
    };
});