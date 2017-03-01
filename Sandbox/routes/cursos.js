var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var nodemailer=require('nodemailer');
var Curso =require('../models/curso');
var User = require('../models/usuario');

var validacion=function(req,res,next){
    console.log(req.user.Rol);
    if(req.user.Rol !="Administrador"){
        res.sendStatus(401);
        return;
    }
    next();
}

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: 'lilibeth.karen@gmail.com',
        pass: 'redkaren94'
    }
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/');
    }
}
router.get('/', ensureAuthenticated,validacion, function(req, res){
    var Curso=mongoose.model('curso');
    Curso.find({}, function(err, course) {
        if(err) throw err;
        res.render('verCursos', {Courses:course});
    });
});

router.get('/crear', ensureAuthenticated,validacion, function(req,res){
    res.render('nuevoCurso');
})

router.get('/:id', ensureAuthenticated,validacion, function(req, res){
    idCurso=req.params.id;
    var busca = {_id: idCurso};
    Curso.findOne(busca,function(err, curso){
        if(err) throw err;
        return res.send(curso);
    });
});

router.get('/crear/profesor', function(req,res){
    var User = require('../models/usuario');
    var busqueda = req.query.term;
    User.find({}, function(err, usuarios){
        if (err){
            return err;
        }
        nombres = [];
        for(i=0; i<usuarios.length; i++){
            nombre_completo = usuarios[i].Nombres + " " + usuarios[i].Apellidos;
            if (usuarios[i].Rol == "Profesor"  && nombre_completo.includes(busqueda)){
                nombres.push(nombre_completo);
            }
        }
        res.json(nombres);
    });
});

router.get('/crear/estudiantes', function(req,res){
    var User = require('../models/usuario');
    var busqueda = req.query.term;
    User.find(function(err, usuarios){
        if (err){
            res.send(err);
        }
        nombres = [];
        for(i=0; i<usuarios.length; i++){
            nombre_completo = usuarios[i].Nombres + " " + usuarios[i].Apellidos;
            if (usuarios[i].Rol == "Estudiante" && nombre_completo.includes(busqueda)){
                nombres.push(nombre_completo);
            }
        }
        res.json(nombres);
    });
});

router.post('/crear', ensureAuthenticated, function(req, res){
    var termino = req.body.profesor.split(" ");
    var nombres = termino[0] + " " + termino[1];
    var apellidos = termino[2] + " " + termino[3];
    var query = {Nombres: nombres, Apellidos: apellidos};
    var Estudiantes = req.body.estudiantes.split(", ");
    Estudiantes.pop(); //Se remueve la coma del final
    User.findOne(query).exec(function (err, user){
        if (err) {
            return err;
        }
        var nuevoCurso= new Curso({
            paralelo: req.body.paralelo,
            profesor: req.body.profesor,
            estudiantes: Estudiantes
        });
        nuevoCurso.save(function(error) {
            if (error) {
                return error;
            }
            console.log('Curso creado con exito');
        });
    });

    res.redirect('/cursos')
});

router.put('/modificar/:id', ensureAuthenticated, function(req,res){
    var id = req.params.id;
    var search = {_id: id};
    var Estudiantes = req.body.estudiantes.split(", ");
    Estudiantes.pop(); //Se remueve la coma del final
    var modificacion = {
        paralelo: req.body.paralelo,
        profesor: req.body.profesor,
        estudiantes: Estudiantes
    }

    Curso.findOneAndUpdate(search, {$set:modificacion}, {new: true}, function(err, doc){
        if(err){
            console.log("Error al modificar el curso!");
        }
        return res.send('Ejercicio modificado con exito');
    });
});

router.delete('/eliminar/:id', ensureAuthenticated, function(req,res){
    var id = req.params.id;
    var search = {_id: id};
    Curso.findOne(search,function(err, curso){
        if(err) throw err;
        curso.remove();
        console.log('Curso eliminado con exito');
        return res.send("se eliminó");
    });
});

module.exports = router;