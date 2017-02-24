function redireccion(){
    window.location="/users/perfil";
}
function ocultarNotifNoCoincideNuevos(){
    $('.errorC').hide();
}
 

$( document ).ready(function() {
    $('#alertaExito').hide();
    $('.CambioContra').hide();
    $('.errorC').hide();
    $('#alertaWarning').hide();

    $("body").on("click",".cambiaContra",function(){
        $('.present').hide();
        $('.CambioContra').show();
        $('.perfil1').addClass("active");
    });

    $("body").on("click","#password_modal_save",function(){
        antigua=$('#old_password').val();
        nueva=$('#new_password').val();
        confirmar=$('#confirm_password').val();

        if(nueva==confirmar){
            console.log("ingresó al ajax");
            $.ajax({
                url:'/users/modifContrasena',
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
