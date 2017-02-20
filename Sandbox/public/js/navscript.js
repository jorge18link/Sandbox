function ocultar(d){
    if (d==1) {
        $(".esconde1").hide();
        $(".esconde2").hide();
        $(".esconde3").hide();
        $(".esconde4").hide();
        $(".esconde5").hide();
        $(".esconde6").hide();
        $(".esconde7").hide();
        $(".esconde8").hide();
    }
    if (d==2) {
        $(".propio1").hide();
        $(".propio2").hide();
        $(".propio3").hide();
        $(".propio4").hide();
        $(".propio5").hide();
        $(".propio6").hide();
        $(".propio7").hide();
        $(".propio8").hide();
    }

}

function esconderTabla(Ntabla){
    if(Ntabla==2){
        $("#propios").hide();
    }
    if (Ntabla==1) {
        $("#con").hide();
    }
}

function botonesTodos(){
        $("#t1").click(function(){
            ocultar(1);
            $(".esconde1").show();
        });
        $("#t2").click(function(){
            ocultar(1);
            $(".esconde2").show();
        });
        $("#t3").click(function(){
            ocultar(1);
            $(".esconde3").show();
        });
        $("#t4").click(function(){
            ocultar(1);
            $(".esconde4").show();
        });
        $("#t5").click(function(){
            ocultar(1);
            $(".esconde5").show();
        });
        $("#t6").click(function(){
            ocultar(1);
            $(".esconde6").show();
        });
        $("#t7").click(function(){
            ocultar(1);
            $(".esconde7").show();
        });
        $("#t8").click(function(){
            ocultar(1);
            $(".esconde8").show();
        });
}
function botonesPropios(){
        $("#p1").click(function(){
            ocultar(2);
            $(".propio1").show();
        });
        $("#p2").click(function(){
           ocultar(2);
            $(".propio2").show();
        });
        $("#p3").click(function(){
            ocultar(2);
            $(".propio3").show();
        });
        $("#p4").click(function(){
            ocultar(2);
            $(".propio4").show();
        });
        $("#p5").click(function(){
            ocultar(2);
            $(".propio5").show();
        });
        $("#p6").click(function(){
            ocultar(2);
            $(".propio6").show();
        });
        $("#p7").click(function(){
            ocultar(2);
            $(".propio7").show();
        });
}

$(document).ready(
    function(){
        $(".navi li").click(
        function(){
            seleccionado=$(".navi li");
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
});

