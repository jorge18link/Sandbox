var app = angular.module('app', ['autocomplete']);

// the service that retrieves some movie title from an url
app.factory('MovieRetriever', function($http, $q, $timeout){
    var MovieRetriever = new Object();

    MovieRetriever.getmovies = function(i) {
        var moviedata = $q.defer();
        var movies;

        var someMovies = ["Fernando", "Karen", "Jorge", "Israel"];

        var moreMovies = ["Fernando", "Karen", "Jorge", "Israel", "Antonio", "Julian"];

        if(i && i.indexOf('T')!=-1)
            movies=moreMovies;
        else
            movies=moreMovies;

        $timeout(function(){
            moviedata.resolve(movies);
        },1000);

        return moviedata.promise
    }

    return MovieRetriever;
});

app.controller('MyCtrl', function($scope, MovieRetriever){
    $scope.data = {}
    $scope.movies = MovieRetriever.getmovies("...");
    $scope.movies.then(function(data){
        $scope.movies = data;
    });

    $scope.getmovies = function(){
        return $scope.movies;
    }

    $scope.doSomething = function(typedthings){
        console.log("Do something like reload data with this: " + typedthings );
        $scope.newmovies = MovieRetriever.getmovies(typedthings);
        $scope.newmovies.then(function(data){
            $scope.movies = data;
        });
    }

    $scope.doSomethingElse = function(suggestion){
        console.log("Suggestion selected: " + suggestion );
    }

    $scope.guardarTarea = function () {
        var data = $("#formulario");
        console.log(data);
    }

});


