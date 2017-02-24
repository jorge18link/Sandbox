var mongoose= require('mongoose');
var Schema = require('mongoose').Schema

var ejercicioResueltoSchema = new Schema({
   idUsuario:String,
   fecha:Date
})

var EjercicioResuelto=module.exports=mongoose.model('ejercicioResuelto',ejercicioResueltoSchema);