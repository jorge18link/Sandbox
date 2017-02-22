$( document ).ready(function() {
      console.log( "ready!" );
      var name="";
      $("body").on("click",".tag",function(){
             name=$(this).attr("name");
              $.ajax({
                url:"/ejerciciosEstudiante/obtener/"+name,
                type: 'get',
                success:function(data){
                     var count=0;
                    for (i in data){
                        count++;
                    }
                    count=count-1
                    var valor=Math.floor((Math.random() * count + 0));
                    console.log(data[valor]);
                    console.log(count);
                    $('.conte').empty();
                    $('panel-body').append('<div>',{'class':'thumbnail col-md-6 col-md-offset-3'}).append(
                        $('.conte').append($('<h2>').text("Titulo:"),$('<p>').text(data[valor].titulo),$('<h2>').text("Descripcion: "),$('<p>').text(data[valor].descripcion),
                            $('<button>',{'class':'btn btn-success btn-lg comenzar','name':data[valor]._id}).text("Comenzar"),
                            $('<button>',{'class':'btn btn-warning btn-lg tag',"name":data[valor].dificultad}).text('Saltar')
                        )
                    )
                    //$('.conte').append($('<p>').text("titulo"))
                }
            })
      });
      $("body").on("click",".comenzar",function(){
         name=$(this).attr("name");
         console.log(name);
         location.href="/ejerciciosEstudiante/realizar/"+name;
         
      })
      
      

      
});