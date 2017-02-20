var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $http.get("json/profesores.json")
    .then(function(res) {
        $scope.todos = res.data.PROFESORES;
        $scope.name="karen";
    });
});