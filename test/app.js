angular.module('myApp', ['yc.md.timepicker'])
    .controller('ctrl', function ($scope) {
        $scope.date = new Date();
    });