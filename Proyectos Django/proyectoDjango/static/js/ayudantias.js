
//google.maps.event.trigger(map, 'resize')
var mapa;


function initMap(aula,horario,latitud,longitud) {
    //regrescar
    mapa = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(-2.143161, -79.968447),
        zoom: 16
    });

    var infoWindow = new google.maps.InfoWindow;
    var marker = new google.maps.Marker({
        map: mapa,
        label: 'A',
        position: new google.maps.LatLng(latitud, longitud)
    });
    var infowincontent = document.createElement('div');
    var aula = document.createElement('strong');
    var hora = document.createElement('strong');
    aula.textContent = "Aula: "+aula;
    hora.textContent = "Horario: "+horario;
    infowincontent.appendChild(aula);
    infowincontent.appendChild(document.createElement('br'));
    infowincontent.appendChild(hora);
    marker.addListener('click', function() {
          infoWindow.setContent(infowincontent);
          infoWindow.open(mapa, marker);
          
    });

}


function agregarAyudantes() {
    var url ="json/ayudantes.json"
    $.getJSON(url, function(resp){
        var ayudantes = resp.Ayudantes;
        initMap();
        $("#todo").append($("<h1>",{"class":"text-center"}).text("Ayudantes"));
        ayudantes.forEach(function(ayuAct){
        	$("#todo").append(
	    		$("<div>",{"class":"ayudante thumbnail col-md-12"}).append(
					$("<div>",{"class":"ayu-info col-md-12"}).append(
						$("<p>").append($("<strong>").text("Nombre: "),""+ayuAct.nombre),
						$("<p>").append($("<strong>").text("Correo: "),""+ayuAct.correo)
					),
					$("<div>",{"class":"ayu-horarios col-md-12","id":""+ayuAct.matricula}).append(
						$("<h3>").text("Horarios disponibles:")
					)		
				)
	   		)
	   		ayuAct.horarios.forEach(function(hor_act){
	   			$("#"+ayuAct.matricula).append(
	   				$("<div>",{"class":"ayu-horario col-md-3"}).append(
	   					$("<p>").append($("<strong>").text("Día: "),""+hor_act.dia),
		   				$("<p>").append($("<strong>").text("Aula: "),""+hor_act.aula),
		   				$("<p>").append($("<strong>").text("Horario: "),""+hor_act.hora),
		   				$("<p>").append($("<strong>").text("Ubicacion: "),$("<a>",{"id":""+hor_act.id,"class":"lin"}).text("Ver en mapa")),
                        $("<hr>")
	   				)
	   			)
                $("#"+hor_act.id).click(function(){
                    var latitud= hor_act.lat;
                    var longitud= hor_act.lng;
                    var aula=hor_act.aula;
                    var horario=hor_act.horario;
                    initMap(aula,horario,latitud,longitud); 
                    $('#modal-mapa').on('shown.bs.modal', function () {
                      google.maps.event.trigger(mapa, 'resize');
                    })
                    $('#modal-mapa').modal("show");
                    
                })
                
            })
        })	 
    });
}

$(document).ready(function(){
    agregarAyudantes();
});