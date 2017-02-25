var mongoose= require('mongoose');
var Schema = require('mongoose').Schema

var resueltoSchema = new Schema({
   idUsuario:String,
   fecha:Date,
   puntos:Number
})

var resuelto=module.exports=mongoose.model('resuelto',resueltoSchema);