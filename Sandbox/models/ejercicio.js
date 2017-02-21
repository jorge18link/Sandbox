var mongoose= require('mongoose');
var Schema = require('mongoose').Schema

var ejercicioSchema = new Schema({
   titulo:String,
   descripcion:String,
   datosDeEntrada:String,
   datosDeSalida:String,
   conjuntoDeEtiquetas:String,
   dificultad:String
})

var Ejercicio=module.exports=mongoose.model('ejercicio',ejercicioSchema);

