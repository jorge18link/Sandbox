$( document ).ready(function() {
    $.ajax({
        url:"/totalInsignias",
        type:'get',
        success:function(respuesta){
            var total = respuesta.total;
            var totalSemana = respuesta.totalSemana;
            //aqui trabaja porque ajax es asincrono y si trabajas fuera puede que no obtengas los datos a tiempo
            if(total>=5){
                $('.novato').show();
            }
            if(total>=10){
                $('.pro').show();
            }
            if(total>=15){
                $('.experto').show();
            }
            if(totalSemana>=5){
                $('.indestructible').show();
            }
            if(totalSemana>=10){
                $('.duroDeMatar').show();
            }
            if(totalSemana>=15){
                $('.rapidoFurioso').show();
            }
        }
    });
});