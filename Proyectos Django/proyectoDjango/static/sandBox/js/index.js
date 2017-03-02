function ocultarTodo(){
	$("#vari-tipos").hide();
	$("#est-ctrl").hide();
	$("#est-rep").hide();
	$("#alert-exito").hide();

}

function cargarDatos(){
	
	var url ="json/ejercicios.json"
    $.getJSON(url, function(resp){
    	var ejercicios = resp.Ejercicios;
        ejercicios.forEach(function(ejeAct){
        	var id="";
        	if(ejeAct.id==1){
        		id="varia";
        	}else if (ejeAct.id==2){
        		id="estruc-ctrl";
        	}else if (ejeAct.id==3) {
        		id="estruc-rept";
        	}
        	$(".sb-desc").append(
        		$("<div>",{"class":"ejercicios thumbnail"}).append(
        			$("<p>").append($("<strong>").text("Título: "),""+ejeAct.titulo),
					$("<p>").append($("<strong>").text("Descripción: "),""+ejeAct.desc),
					$("<p>").append($("<strong>").text("Dificultad: "),""+ejeAct.dificultad),
					$("<a>",{"href":"#pa-ejercicio"}).append(
						$("<button>",{"id":""+id , "type":"button", "class":"btn btn-primary "+id}).text("Realizar")
					)
        		)
        	);
        	$("."+id).click(function(){
		 		$("#pa-ejercicio").show();
		 		ocultarTodo();
		 		if(id=="varia"){
	        		$("#vari-tipos").show();
	        	}else if (id=="estruc-ctrl"){
	        		$("#est-ctrl").show();
	        	}else if (id=="estruc-rept") {
	        		$("#est-rep").show();
	        	}
		 	});
        });
    });
}

$(document).ready(function(){
   $("#pa-ejercicio").hide();
   $("#alert-exito").hide();

   cargarDatos();

 	$(".exito").click(function(){
 		$("#alert-exito").show();
 		$("#pa-ejercicio").hide();
 	});

    $(".fracaso").click(function(){
        $("#pa-ejercicio").hide();
    });
});