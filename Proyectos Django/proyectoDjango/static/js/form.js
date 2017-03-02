function boton(){
 $(".boton").click(function(){
    titulo= $("#titulo").val();
    fecha= $("#fecha").val();
    descr= $("#dp").val();
        var temp=$("<div>",{"class":"thumbnail pequeno col-md-5"}).append($("<strong>").text("Profesor"), $("<p>").text("Marco Calderon") , $("<strong>").text("Título:"),$("<p>").text(titulo),($("<strong>").text("Fecha: ")),($("<p>").text(fecha)),($("<strong>").text("Descripción: ")),($("<p>").text(descr)),($("<span>",{"class":"glyphicon glyphicon-file"})));
        $(temp).append($("<p>").text("Archivo.pdf"));
        $(".contenedor").append(temp);
        $("#titulo").val("");
        $("#fecha").val("");
        $("#dp").val("");
 
});

}







$(document).ready(function() {
    $("#datePicker")
        .datepicker({
            format: 'mm/dd/yyyy'
    })
    .on('changeDate', function(e) {
            // Revalidate the date field
            $('#contact_form').bootstrapValidator('revalidateField', 'date');
        });

    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            titulo_project: {
                validators: {
                        stringLength: {
                        min: 4,
                    },
                        notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
            date:{
                excluded: false,
                validators: {
                    notEmpty: {
                        message: 'The date is required'
                    },
                    date: {
                        format: 'MM/DD/YYYY',
                        message: 'The date is not a valid'
                    }
                }
            },
            comment: {
                validators: {
                      stringLength: {
                        min: 10,
                        max: 200,
                        message:'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                    }
                }
            }
    });
    boton();
});