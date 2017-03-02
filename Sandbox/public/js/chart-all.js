$( document ).ready(function() {
    var Resueltos = [];
    var FechasName = [];
    var FechasSmall = [];
    var Categorias = [];
    var Cantidad = [];

    var Resueltos = $("body").on("click", "#mostrar", function (req, resp) {
        date1 = $('#datepicker1').val();
        date2 = $('#datepicker2').val()
        $.ajax({
            method: "GET",
            url: "reportes/findAll/"+date1 +"/" +date2,
            dataType: "json",
            success: function (resueltos) {
                console.log(resueltos);
            }
        });
    });

    $("body").on("click", "#mostrar", function (req, resp) {
        date1 = $('#datepicker1').val();
        date2 = $('#datepicker2').val()
        $.ajax({
            method: "GET",
            url: "reportes/findDates/"+date1 +"/" +date2,
            dataType: "json",
            success: function (fechas) {
                console.log(fechas);
                FechasSlice = [];
                for(var i=0; i<fechas.length; i++) {
                    FechasSlice.push((fechas[i]).slice(0,10));
                    console.log(FechasSlice);
                }

                //Arreglo de Categorias
                $.each(FechasSlice, function(i, el){
                    if($.inArray(el, Categorias) === -1) Categorias.push(el);
                });
                console.log(Categorias);

                contador = 0;

                for(var i=0; i<Categorias.length; i++) {
                    for(var j=0; j<FechasSlice.length; j++) {
                        if(Categorias[i] === FechasSlice[j]){
                            contador = contador + 1;
                        }
                    }
                    Cantidad.push(contador);
                    contador = 0;
                    if (Cantidad.length === Categorias.length){
                        break;
                    }
                }
                console.log(Cantidad);

                $('.chart').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Reporte Ejercicios Resueltos por Día'
                    },
                    subtitle: {
                        text: 'Source: Fundamentos de Programación'
                    },
                    xAxis: { //Esto necesito
                        categories: Categorias
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Numero de ejercicios (Resueltos)'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{ //Esto necesito
                        name: "Ejercicios Resueltos",
                        data: Cantidad
                    }]
                });


            }
        });
    });
});