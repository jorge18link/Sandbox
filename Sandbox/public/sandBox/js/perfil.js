$( document ).ready(function() {
      

    $("body").on("click",".cambiaContra",function(){
        $('.present').empty();
        $('.present').append(
            $("<p>").append($("<br>").text("Día: ")))
    });
/*
$("<div>",{"class":"ayu-horario col-md-3"}).append(
    $("<p>").append($("<strong>").text("Día: "),""+hor_act.dia),
    $("<p>").append($("<strong>").text("Aula: "),""+hor_act.aula),
    $("<p>").append($("<strong>").text("Horario: "),""+hor_act.hora),
    $("<p>").append($("<strong>").text("Ubicacion: "),$("<a>",{"id":""+hor_act.id,"class":"lin"}).text("Ver en mapa")),
    $("<hr>")
)
*/
})
