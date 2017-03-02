var mongoose= require('mongoose');
var bcrypt = require('bcrypt');
var Schema = require('mongoose').Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
var usuario = require('../models/usuario');

var cursoSchema = new Schema({
    paralelo: Number,
    profesor: String,
    idProfesor: String,
    estudiantes: [String],
    idEstudiantes: [String]
}, {
    versionKey: false
});

var Curso=module.exports=mongoose.model('curso',cursoSchema);

/* paralelo: {type:ObjectIdSchema, default: function () { return new ObjectId()} },
   profesor: {type:Schema.ObjectId, ref: 'usuario'},
   estudiantes: [{type:Schema.ObjectId, ref: 'usuario'}]*/