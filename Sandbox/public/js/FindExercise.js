function crear(count,valor,data){
    console.log(data)
    console.log("valor2: "+ valor)
    $('.conte').empty();
        if(count>-1){
            $('.conte').append($('<h2>').text("Titulo:"),$('<p>').text(data[valor].titulo),$('<h2>').text("Descripcion: "),$('<p>').text(data[valor].descripcion),
                $('<button>',{'class':'btn btn-success btn-lg comenzar','name':data[valor]._id}).text("Comenzar"),
                $('<button>',{'class':'btn btn-warning btn-lg saltar',"name":data[valor].dificultad}).text('Saltar')
            )
        }else{
            $('.conte').append(
                $('<div>',{'class':'alert alert-success'}).append(
                    $('<strong>').text('warning! NO existen ejercicios de este nivel')
                ),
                $('<img>',{'class':'img-responsive img-rounded war col-md-offset-4',"src":"/public/img/warning.png"})
            )
        }
}

$( document ).ready(function() {
      console.log("ready!");
      var name="";
      var json;
      var valor=0;
      var count=-1;
      $("body").on("click",".tag",function(){
            valor =0;
            count =-1;
            name=$(this).attr("name");
            console.log("name is: "+name)
            $.ajax({
                url:"/ejerciciosEstudiante/obtener/"+name,
                type: 'get',
                success:function(data){
                    console.log("success")
                    for (i in data){
                        count++;
                    }
                    console.log(count)
                    json=data;
                    valor=Math.floor(Math.random() *(count+1));
                    crear(count,valor,json);    
                }
            })
      });

      $("body").on("click",".comenzar",function(){
         name=$(this).attr("name");
         location.href="/ejerciciosEstudiante/realizar/"+name;
      })

      $("body").on("click",".saltar",function(){
          console.log("comienza saltar")
          console.log("count: "+ count)
          valor=Math.floor(Math.random() *(count+1));
          console.log("valor1:"+valor);
          crear(count,valor,json);
      });
      //este js funciona bien a menos que des varios clicks en el
});