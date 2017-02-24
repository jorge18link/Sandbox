$( document ).ready(function() {
        
        console.log('entre')
        $('#formulario').submit(function(e){
            e.preventDefault();
             $.ajax({
                type:'Post',
                url:'/ejerciciosEstudiante/upload',
                data: new FormData(this),
                processData:false,
                contentType:false,
                success:(function(data){
                     console.log(data);
                })
             });
        })

});