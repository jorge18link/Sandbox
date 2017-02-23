$( document ).ready(function() {
      console.log( "ready!" );
      var name="";
      $("body").on("click",".tag",function(){
             name=$(this).attr("name");
              $.ajax({
                url:"/ejerciciosEstudiante/obtener/"+name,
                type: 'get',
                success:function(data){
                     var count=-1;
                    for (i in data){
                        count++;
                    }
                    var valor=Math.floor((Math.random() * count));
                    console.log(data[valor]);
                    console.log(count);
                    
                    $('.conte').empty();
                    if(valor>-1){
                        
                            $('.conte').append($('<h2>').text("Titulo:"),$('<p>').text(data[valor].titulo),$('<h2>').text("Descripcion: "),$('<p>').text(data[valor].descripcion),
                                $('<button>',{'class':'btn btn-success btn-lg comenzar','name':data[valor]._id}).text("Comenzar"),
                                $('<button>',{'class':'btn btn-warning btn-lg tag',"name":data[valor].dificultad}).text('Saltar')
                            )
                        
                    }else{
                         $('.conte').append(
                             $('<div>',{'class':'alert alert-success'}).append(
                                 $('<strong>').text('warning! NO existen ejercicios de este nivel')
                             ),
                              $('<img>',{'class':'img-responsive img-rounded war col-md-offset-4',"src":"/public/img/warning.png"})

                        )
                        

                    }
                    //$('.conte').append($('<p>').text("titulo"))
                }
            })
      });
      $("body").on("click",".comenzar",function(){
         name=$(this).attr("name");
         console.log(name);
         location.href="/ejerciciosEstudiante/realizar/"+name;
         
      })
     // $('<img>',{'class':'img-responsive col-md-offset-3',"src":"https://openclipart.org/download/215225/rs_caution_geek_man.svg"})
      
      

      
});