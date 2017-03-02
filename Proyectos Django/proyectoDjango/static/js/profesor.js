var app = angular.module('myApp',[],function($interpolateProvider){
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
}); 
app.controller('myCtrl', function($scope, $http) {
    $http.get("{% static 'json/profesores.json' %}")
    .success(function(res) {
        $scope.todos = res;
        console.log(res);
    });
});