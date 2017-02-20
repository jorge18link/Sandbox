var app = angular.module('myA', []);
app.controller('control', function($scope, $http) {
    $http.get("json/sas.json")
    .then(function(res) {
        $scope.todos = res.data.datos;
    });
});

$(document).ready(function(){
   $(".recu").hide();
   $("#WD1").click(function(){
   	  $(".recu").hide();
   	  $("#D1").show();
   });
   $("#WD2").click(function(){
   	  $(".recu").hide();
   	  $("#D2").show();
   });
   $("#WD3").click(function(){
   	  $(".recu").hide();
   	  $("#D3").show();
   });
   $("#WD4").click(function(){
   	  $(".recu").hide();
   	  $("#D4").show();
   });
   $("#WD5").click(function(){
   	  $(".recu").hide();
   	  $("#D5").show();
   });
   $("#WD6").click(function(){
   	  $(".recu").hide();
   	  $("#D6").show();
   });
   $("#WD7").click(function(){
   	  $(".recu").hide();
   	  $("#D7").show();
   });
   $("#WD8").click(function(){
   	  $(".recu").hide();
   	  $("#D8").show();
   });
   $("#WD9").click(function(){
   	  $(".recu").hide();
   	  $("#D9").show();
   });

});
