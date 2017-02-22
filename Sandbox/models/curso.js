var mongoose= require('mongoose');
var bcrypt = require('bcrypt');
var Schema = require('mongoose').Schema

require('../models/usuario');
var usuario =mongoose.model('usuario');

var cursoSchema = new Schema({
    Paralelo:String,
    Profesor: {type:Schema.ObjectId, ref: "usuario"},
    Estudiantes: {type:Schema.ObjectId, ref: "usuario"}
});

var curso=module.exports=mongoose.model('curso',cursoSchema);


