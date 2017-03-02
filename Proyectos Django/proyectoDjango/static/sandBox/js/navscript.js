function ocultar(d){
    if (d==1) {
        $("#esconde1").hide();
        $("#esconde2").hide();
        $("#esconde3").hide();
        $("#esconde4").hide();
        $("#esconde5").hide();
        $("#esconde6").hide();
        $("#esconde7").hide();
        $("#esconde8").hide();
    }
    if (d==2) {
        $("#prop1").hide();
        $("#prop2").hide();
        $("#prop3").hide();
        $("#prop4").hide();
        $("#prop5").hide();
        
    }

}

function mostrarTabla(N){
    if (N==1) {
        $("#comment1").show();
    }
    if(N==2){
        $("#visible1").show();
    }
}


function esconderTabla(Ntabla){
    if (Ntabla==1) {
        $("#comment1").hide();
        $("#comment2").hide();
    }
    if(Ntabla==2){
        $("#visible1").hide();
        $("#visible2").hide();
    }
}

function botonesTodos(){
        $("#t1").click(function(){
            ocultar(1);
            $("#esconde1").show();
        });
        $("#t2").click(function(){
            ocultar(1);
            $("#esconde2").show();
        });
        $("#t3").click(function(){
            ocultar(1);
            $("#esconde3").show();
        });
        $("#t4").click(function(){
            ocultar(1);
            $("#esconde4").show();
        });
        $("#t5").click(function(){
            ocultar(1);
            $("#esconde5").show();
        });
        $("#t6").click(function(){
            ocultar(1);
            $("#esconde6").show();
        });
        $("#t7").click(function(){
            ocultar(1);
            $("#esconde7").show();
        });
        $("#t8").click(function(){
            ocultar(1);
            $("#esconde8").show();
        });
}
function botonesPropios(){
        $("#p1").click(function(){
            ocultar(2);
            $("#prop1").show();
        });
        $("#p2").click(function(){
           ocultar(2);
            $("#prop2").show();
        });
        $("#p3").click(function(){
            ocultar(2);
            $("#prop3").show();
        });
        $("#p4").click(function(){
            ocultar(2);
            $("#prop4").show();
        });
        $("#p5").click(function(){
            ocultar(2);
            $("#prop5").show();
        });
        $("#p6").click(function(){
            ocultar(2);
            $(".prop6").show();
        });
}

function guardar(){
    $("#g1").click(function(){
        text=$("#comment1").val()
        $(".visible1").append(text);
        esconderTabla(2);
        $("#visible1").show()

    })
    $("#g2").click(function(){
        text=$("#comment2").val()
        $(".visible1").append(text);
        esconderTabla(2);
        $("#visible2").show()

    })
}

function esconderEt(num){
    if (num==1) {
        $("#mostrar1").hide();
        $("#mostrar2").hide();
    }
    if (num==2) {
        $("#et1").hide();
        $("#esconde1").hide();
        $("#et2").hide();
        $("#esconde2").hide();
    }
    
}

function editar(){
    $('#editar1').click(function(){
        $("#mostrar1").show();
        esconderEt(2)
    })
    $('#editar2').click(function(){
        $("#mostrar2").show();
        esconderEt(2)
    })
}

$(document).ready(
    function(){
        $("·sidebar.nav li").click(
        function(){
            seleccionado=$(".nav li");
            seleccionado.removeClass("active");
            $(this).addClass('active');
        })

        ocultar(1);
        botonesTodos();
        ocultar(2);
        botonesPropios();

        esconderTabla(2);
        $("#etiquetaProp").click(function(){
            esconderTabla(1)
            $("#propios").show();
        })

        $("#etiquetaTodos").click(function(){
            esconderTabla(2);
            $("#con").show();
        })
        mostrarTabla(1)
        guardar();
        mostrarTabla(2);
        
        esconderEt(1);
        editar();

});
