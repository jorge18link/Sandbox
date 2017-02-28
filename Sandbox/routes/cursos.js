var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var Curso =require('../models/curso');
var User = require('../models/usuario');

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/');
    }
}

var validacion=function(req,res,next){
    console.log(req.user.Rol);
    if(req.user.Rol !="Administrador"){
        res.sendStatus(401);
        return;
    }
    next();
}

router.get('/', function(req, res){
    var Curso=mongoose.model('curso');
    Curso.find({}, function(err, course) {
        if(err) throw err;
        res.render('verCursos', {Courses:course});
    });
});

router.get('/crear', function(req,res){
    res.render('nuevoCurso');
})

router.get('/:id', function(req, res){
    idCurso=req.params.id;
    var busca = {_id: idCurso};
    Curso.findOne(busca,function(err, curso){
        if(err) throw err;
        return res.send(curso);
    });
});

router.post('/crear',function(req, res){
    var temp = req.body.profesor.split(" ");
    var nombres = temp[0] + " " + temp[1];
    var apellidos = temp[2] + " " + temp[3];
    var query = {Nombres: nombres, Apellidos: apellidos};

    User.findOne(query).exec(function (err, user){

        if (err) {
            return err;
        }

        var nuevoCurso= new Curso({
            paralelo: req.body.paralelo,
            profesor: req.body.profesor,
            estudiantes: []
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

router.put('/modificar/:id', function(req,res){
    var id = req.params.id;
    var search = {_id: id};

    var modificacion = {
        paralelo: req.body.paralelo,
        profesor: req.body.profesor
        //estudiantes: req.body.estudiantes
    }

    Curso.findOneAndUpdate(search, {$set:modificacion}, {new: true}, function(err, doc){
        if(err){
            console.log("Error al modificar el curso!");
        }
        console.log('Curso modificado con exito!');
    });
    res.redirect('/cursos');
});

router.delete('/eliminar/:id', function(req,res){
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