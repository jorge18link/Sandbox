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

      
});