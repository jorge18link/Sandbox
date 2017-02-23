
$( document ).ready(function() {
      console.log( "ready!" );
      var name="";
      $("body").on("click",".eliminar",function(){
             name=$(this).attr("name");
      });
      
      $('.confirmarEliminar').click(function(){
          $.ajax({
                url:"/ejercicios/EliminarEjercicio/"+name,
                type: 'delete',
                success:function(data){
                    location.reload();
                }
            })
      })

       $("body").on("click",".modificar",function(){
            name=$(this).attr("name");
            valor=0;
            $.ajax({
                url:"/ejercicios/"+name,
                type: 'get',
                success:function(ejercicio){
                    
                    $("#modiTitulo").val(ejercicio.titulo);
                    $("#modiDescripcion").val(ejercicio.descripcion);
                    $("#modiDatosIn").val(ejercicio.datosDeEntrada);
                    $("#modiDatosOut").val(ejercicio.datosDeSalida);
                    $("#modiEtiquetas").val(ejercicio.conjuntoDeEtiquetas);
                    if(ejercicio.dificultad=="Easy"){valor=1;}
                    if(ejercicio.dificultad=="Normal"){valor=2;}
                    if(ejercicio.dificultad=="Hard"){valor=3;}
                    else{valor==4;}
                    $("#modiDificultad").val(valor)
                    
                }
            })
      });

      
});