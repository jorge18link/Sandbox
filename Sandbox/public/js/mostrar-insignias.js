function redireccion(){
    window.location="/perfil";
}
function ocultarNotifNoCoincideNuevos(){
    $('.errorC').hide();
}

$( document ).ready(function() {
    $.ajax({
        url:"/totalInsignias",
        type:'get',
        success:function(respuesta){
            var total = respuesta.total;
            var totalSemana = respuesta.totalSemana;
            var puntaje = respuesta.totalPuntos;
            $('.numResueltos').text(total)
            $('.puntuacion').text(puntaje)
            //aqui trabaja porque ajax es asincrono y si trabajas fuera puede que no obtengas los datos a tiempo
            if(total>=5){
                $('.novato').show();
            }
            if(total>=10){
                $('.pro').show();
            }
            if(total>=15){
                $('.experto').show();
            }
            if(totalSemana>=5){
                $('.indestructible').show();
            }
            if(totalSemana>=10){
                $('.duroDeMatar').show();
            }
            if(totalSemana>=15){
                $('.rapidoFurioso').show();
            }
        }
    });

    $('#alertaExito').hide();
    $('.CambioContra').hide();
    $('.errorC').hide();
    $('#alertaWarning').hide();

    $("body").on("click",".cambiaContra",function(){
        $('.divInsignias').hide();
        $('.CambioContra').show();
        $('.liPerfil').removeClass('active');
        $('.liPass').addClass("active");
        $('.titulo').text("Cambiar Contraseña");
    });

    $("body").on("click","#password_modal_save",function(){
        antigua=$('#old_password').val();
        nueva=$('#new_password').val();
        confirmar=$('#confirm_password').val();

        if(nueva==confirmar){
            console.log("ingresó al ajax");
            $.ajax({
                url:'/modifContrasena',
                type:'post',
                data:{
                    nContraseña: nueva,
                    validarAntigua: antigua
                },

                success: function(usuario){
                    if (usuario.cambio==1){
                        console.log("hola");
                        $('#mensajeAlertaExito').text(usuario.mensaje);
                        $('#alertaExito').show();
                        $('#alertaWarning').hide();
                        setTimeout("redireccion()",4000 );

                    }else{
                        console.log("chao");
                        $('#mensajeAlerta').text(usuario.mensaje);
                        $('#alertaWarning').show();
                        setTimeout(function() {
                            $('#alertaWarning').hide();
                        }, 4000);
                        $('#alertaExito').hide();
                    } 
            }
            }); 
        }else{
            $('.errorC').show();
            setTimeout("ocultarNotifNoCoincideNuevos()",4000 );
        }

    })
});