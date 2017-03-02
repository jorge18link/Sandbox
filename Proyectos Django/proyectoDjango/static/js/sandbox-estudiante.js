
function ocultarTodo(){
	
	$("#vari-tipos").hide();
	$("#est-ctrl").hide();
	$("#est-rep").hide();
}


$(document).ready(function(){
 	ocultarTodo();

 	$("#varia").click(function(){
 		ocultarTodo();
 		$("#vari-tipos").show();
 	});

 	$("#estruc-ctrl").click(function(){
 		ocultarTodo();
 		$("#est-ctrl").show();
 	});
 	
 	$("#estruc-rept").click(function(){
 		ocultarTodo();
 		$("#est-rep").show();
 	});

 	$(".exito").click(function(){
 		alert("Trabajo subido con exito");
 		ocultarTodo();
 	});
});