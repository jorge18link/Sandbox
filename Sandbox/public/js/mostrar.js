$( document ).ready(function(){
    $('#formulario').submit(function(e){
        console.log('entre al submit');
        var _id= $('.btn-success').attr('name')
        console.log(name)
        e.preventDefault();
        $.ajax({
            type:'Post',
            url:'/ejerciciosEstudiante/upload/'+_id,
            data: new FormData(this),
            processData:false,
            contentType:false,
            success:(function(data){
                console.log(data);
            })
        });
    })
});