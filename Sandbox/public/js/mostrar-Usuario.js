$( document ).ready(function() {
    $.ajax({
        url:"/usulog",
        type:'get',
        success:function(respuesta){
            nombre = respuesta.Nombres;
            apellido= respuesta.Apellidos;
            correo = respuesta.CorreoElectronico;
            rol = respuesta.Rol;
            $('.nombreUser').text(nombre+" "+apellido);
            $('.correo').text(correo);
            $('.rol').text(rol);
        }
    });
});