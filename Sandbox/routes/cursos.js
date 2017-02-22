var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');

var Curso =require('../models/curso');

/*var User=require('../models/usuario');
var validacion=function(req,res,next){
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
        //req.flash('error_msg','You are not logged in');
        res.redirect('/');
    }
}*/

router.get('/', function(req, res){
    res.render('verCursos'); //curso pero debe cambiarse a la vista que usa el framework
});

router.get('/:id', function(req, res){
    idCurso=req.params.id;
    var busca = {_id: idCurso};
    Curso.findOne(busca,function(err, curso){
        if(err) throw err;
        return res.send(curso);
    });
});

//router.post('/crear', function(req, res){
//});

router.put('/modificar/:id', function(req,res){
    idCurso = req.params.id
    //query de busqueda
    var busca = {_id: idCurso};
    /*
     User.findOne(busca,function(err, user){
     console.log('Usuario Anterior:');
     console.log(user);
     });
     */
    //Se toman los datos de la vista con los parametros que vas a modificar
    var modificacion = { //Verificar esto ! son objetos
        Paralelo: req.body.paralelo,
        Profesor: req.body.profesor,
        Estudiantes: req.body.estudiantes
    }

    //Ejemplo ----> Cat.findOneAndUpdate({age: 17}, {$set:{name:"Naomi"}}, {new: true}, function(err, doc){
    User.findOneAndUpdate(busca, {$set:modificacion}, {new: true}, function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
        console.log('Usuario Modificado con exito');
        //console.log(doc);
    });

    //Aqui Carga la pagina que sigue
    res.redirect('/');
});

router.delete('/eliminar/:id', function(req,res){
    idCurso = req.params.id
    var busca = {_id: idCurso};
    Curso.findOne(busca,function(err, curso){
        if(err) throw err;
        curso.remove();
        console.log('Curso eliminado con exito');
        return res.send("se eliminó");
    });
});

module.exports = router;