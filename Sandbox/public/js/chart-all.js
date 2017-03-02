$( document ).ready(function() {
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
            categories: [
                'Lun',
                'Mar',
                'Mié',
                'Jue',
                'Vie',
                'Sáb',
                'Dom',
                'Lun',
                'Mar',
                'Mié',
                'Jue',
                'Vie'
            ]
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
            name: 'Ejercicios Resueltos',
            data: $("body").on("click", "#mostrar", function (req, resp) {
                $.ajax({
                    method: "GET",
                    url: "reportes/findAll",
                    dataType: "json",
                    data: {
                        date1: $('#datepicker1').val(),
                        date2: $('#datepicker2').val()
                    },
                    success: function (fechas) {
                        console.log($('#datepicker1').val());
                        console.log(fechas);
                    }
                });
            })
        }]
    });
});