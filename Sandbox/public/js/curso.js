
$( document ).ready(function() {
    console.log( "ready!" );
    var name="";
    $("body").on("click",".eliminar",function(){
             name=$(this).attr("name");
    });
      
    $('.confirmarEliminar').click(function(){
        $.ajax({
            url:"/cursos/eliminar/"+name,
            type: 'delete',
            success:function(data){
                location.reload();
            }
        })
    });
    
    var lastId="";
    $("body").on("click",".modificar",function(){
        name=$(this).attr("name");
        lastId=name;
        $.ajax({
            url:"/cursos/"+name,
            type: 'get',
            success:function(curso){
                $("#modiParalelo").val(curso.paralelo);
                $("#modiProfesor").val(curso.profesor);
            }
        })
    });


    $("body").on("click",".confirmarModificar",function(){
        var paralelo =$('#modiParalelo').val();
        var profesor=$('#modiProfesor').val();

        $.ajax({
            url:"cursos/modificar/"+lastId,
            type: 'put',
            data:{
                paralelo : paralelo,
                profesor: profesor,
                //estudiantes:[]
            },
            success:function(curso){
                location.reload();
            }
        })
    });
});