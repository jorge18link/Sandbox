$( document ).ready(function() {
    $('#formulario').submit(function(e){
        console.log('entre al submit del csv');
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/cursos/csv',
            data: new FormData(this),
            processData:false,
            contentType:false,
            success:(function(data){
                console.log("ya subi el csv mira la carpeta archivos");
            })
        });
    })
});