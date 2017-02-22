$( document ).ready(function() {
      $('#example').DataTable();

      console.log( "ready!" );
      var name="";
      $("body").on("click",".eliminar",function(){
             name=$(this).attr("name");
      });
      
      $('.confirmar').click(function(){
          $.ajax({
                url:"/users/eliminarUsuario/"+name,
                type: 'delete',
                success:function(data){
                    location.reload();
                }
            })
      })

      

 $("body").on("click",".modificar",function(){
             name=$(this).attr("name");
             $.ajax({
                 url:"users/" + name,
                 type: 'get',
                 success:function(usuario){
                    $("#modifId").val(usuario._id);
                    $("#modifCorreo").val(usuario.CorreoElectronico);
                    $("#modifRol").val(usuario.Rol);
                    $("#modifTipo").val(usuario.TipoDeIdentificacion);
                    $("#modifIdentificacion").val(usuario.Identificacion);
                    $("#modifNombres").val(usuario.Nombres);
                    $("#modifApellidos").val(usuario.Apellidos);
                    $("#modifCarrera").val(usuario.Carrera);
                    $("#MyModal2").modal("show");
                 }
             })
      });

$("body").on("click",".guardar", function(){
    var id =$('#modifId').val();
    var Correo=$('#modifCorreo').val();
    var Rol=$('#modifRol').val();
    var Tipo=$('#modifTipo').val();
    var Identificacion=$('#modifIdentificacion').val();
    var Nombres=$('#modifNombres').val();
    var Apellidos=$('#modifApellidos').val();
    var Carrera=$('#modifCarrera').val();
    console.log(Correo);
    
    $.ajax({
    url:"users/modificar/" + id,
    type: 'put',
    data: {
        _id : id,
        CorreoElectronico : Correo,
        Rol: Rol,
        TipoDeIdentificacion: Tipo,
        Identificacion: Identificacion,
        Nombres:Nombres,
        Apellidos: Apellidos,
        Carrera:Carrera
    },
    success:function(usuario){
        location.reload();
    }
})      
});

})