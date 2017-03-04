$( document ).ready(function() {
    $('.tipoIdent').val('Cédula');
    $('.tipoIdent').hide();
    $('.groupCarrera').hide();
    $('.inputCarrera').val('No especificada');
    $('.ident').attr("placeholder", "Introduzca Cédula");
    $( ".selectedRol" ).change(function() {
        valor = $('.selectedRol').val();
        if(valor=="Estudiante" | valor=="Ayudante"){
            $('.tipoIdent').val('Matrícula');
            $('.ident').attr("placeholder", "Introduzca matrícula");
            $('.inputCarrera').val('');
            $('.groupCarrera').show();
        }
        if(valor=="Administrador" | valor=="Profesor"){
            $('.groupCarrera').hide();
            $('.inputCarrera').val('No especificada');
            $('.tipoIdent').val('Cédula');
            $('.ident').attr("placeholder", "Introduzca cédula");
        }
    });

    $("body").on("click",".crear",function(){
        var correo =$('.inputCorreo').val();
        var rol=$('.inputRol').val();
        var tipoIdentificacion=$('.inputtipoIdentificacion').val();
        var identificacion=$('.inputIdentificacion').val();
        var nombre=$('.inputNombre').val();
        var apellido=$('.inputApellido').val();
        var carrera=$('.inputCarrera').val();

        if(correo,identificacion,nombre,apellido!=''){
            $.ajax({
                url:"/users/crear",
                type: 'post',
                data:{
                    CorreoElectronico:correo,
                    Rol:rol,
                    TipoDeIdentificacion:tipoIdentificacion,
                    Identificacion:identificacion,
                    Nombres:nombre,
                    Apellidos:apellido,
                    Carrera:carrera
                },
                success:function(resp){
                    /*
                    $('.inputCorreo').val('');
                    $('.inputRol').val('');
                    $('.inputtipoIdentificacion').val('');
                    $('.inputIdentificacion').val('');
                    $('.inputNombre').val('');
                    $('.inputApellido').val('');
                    $('.inputCarrera').val('');
                    */
                    console.log(resp)
                    location.reload();
                }
            });
            
        }else{
            console.log("tienes que llenar todos los campos");
        }
    })
});