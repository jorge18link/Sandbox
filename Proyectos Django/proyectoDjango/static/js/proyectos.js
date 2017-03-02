function mandarDatos(){
	var titu="ljsdfsdf";
	var date="sfsf123";
	var tag="fadg65734";
	var descr="eg13235";

	var proyecto= {
		titulo:""+titu,
	    fecha: ""+date,
	    etiquetas: ""+tag,
	    descripcion: ""+descr
	};

	var obj = JSON.parse(proyecto);
	console.log(obj);


}

$(document).ready(function(){
    mandarDatos();

});