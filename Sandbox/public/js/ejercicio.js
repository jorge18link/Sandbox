
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
    
    var lastId="";
    $("body").on("click",".modificar",function(){
        name=$(this).attr("name");
        lastId=name;
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
    
    $("body").on("click",".confirmarModificar",function(){
        var titulo =$('#modiTitulo').val();
        var descripcion=$('#modiDescripcion').val();
        var datosIn=$('#modiDatosIn').val();
        var datosOut=$('#modiDatosOut').val();
        var etiquetas=$('#modiEtiquetas').val();
        var valor=$('#modiDificultad').val();
        var dificultad='';
        if(valor==1){
            dificultad="Easy"
        }else if(valor==2){
            dificultad="Normal"
        }else if(valor==3){
            dificultad="Hard"
        }else{
            dificultad="Undefined"
        }

        $.ajax({
            url:"/ejercicios/modificar/"+lastId,
            type: 'put',
            data:{
                _id : lastId,
                titulo : titulo,
                descripcion: descripcion,
                datosDeEntrada: datosIn,
                datosDeSalida: datosOut,
                conjuntoDeEtiquetas:etiquetas,
                dificultad: dificultad,
                
            },
            success:function(ejercicio){
                location.reload();
            }
        
        });
    })
});