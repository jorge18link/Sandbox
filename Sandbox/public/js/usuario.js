$( document ).ready(function() {
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

      
});