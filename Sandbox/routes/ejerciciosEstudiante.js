var Ejercicio=require('../models/ejercicio')
var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var PythonShell=require('python-shell');
var EjercicioResuelto= require('../models/resuelto')
var User= require('../models/usuario')



function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/');
	}
}

var validacion=function(req,res,next){
	if(req.user.Rol !="Estudiante"){
  	res.sendStatus(401);
  	return;
  }
  next();	
}

router.get('/',ensureAuthenticated,validacion,function(req,res){
    res.render('index-Estudiantes')
})

router.get('/realizar/:id',function(req,res){
    var id=req.params.id;
	var busca = {_id: id};
    Ejercicio.findOne(busca,function(err, ej){
			if(err) throw err;
            res.render('HacerEjercicio', {list:ej});
            
    });    
})
router.get('/obtener/:dificultad',ensureAuthenticated,validacion,function(req,res){
   dificu= req.params.dificultad;
   var busca ={dificultad:dificu}
    Ejercicio.find(busca, function(err, ej) {
		if(err) throw err;
            console.log(ej);
            res.send(ej);
	});   
})

router.post('/upload/:idEjer', function(req, res) {
   //El modulo 'fs' (File System) que provee Nodejs nos permite manejar los archivos
	var fs = require('fs');
	var idEjercicio= req.params.idEjer;
	var puntos=0;
	var tmp_path = req.files.archivo.path;
	var tipo = req.files.archivo.type;
	var idUserLogeado= req.user._id;
	var fechanow= new Date();
	var busca = {_id: idEjercicio};
	var mensaje;
	var nombreArchivo= req.files.archivo.name;
	var target_path='./archivos/'+nombreArchivo;
	var pyshell=new PythonShell(target_path);
	
	fs.rename(tmp_path,target_path,function(err){
		if(err) throw err;
		fs.unlink(tmp_path,function(err){
			pyshell.on('message', function (message) {
				mensaje=message;
			});
		});
	});

	Ejercicio.findOne(busca,function(err, ej){
		if(err) throw err;
		if(ej.dificultad=='Easy')puntos=5;
		if(ej.dificultad=='Normal')puntos=10;
		if(ej.dificultad=='Hard')puntos=15;
		var uno = (String(ej.datosDeSalida)).concat("\r");
		var dos = mensaje;

		if(uno==dos){
			var nuevo=new EjercicioResuelto({
				idUsuario: idUserLogeado,
				fecha:fechanow,
				puntos:puntos
			 })
			nuevo.save(function(err){
				if(err){
					console.log(err);
				}
				var busUser = {_id: idUserLogeado}
				console.log('El usuario logeado es: '+idUserLogeado);
				User.findOne(busUser, function(err1, usuario) {
					if(err1){
						console.log("Ocurrio un error al buscar data");
						throw err1;
					}
					//console.log(usuario);
					//console.log('los puntos del ejercicio son: '+puntos)
					//console.log('los puntos antes de sumarle son: '+ usuario.puntajeObtenido)
					var puntosUsuario = usuario.puntajeObtenido + puntos;
					//console.log('los puntos obtenidos luego de sumar los puntos del ejercicio son: '+puntosUsuario )

					var modificacion={
						puntajeObtenido: puntosUsuario
					}

					User.findOneAndUpdate(busUser, {$set:modificacion}, function(err2, doc){
						if(err2){					
							console.log("Something wrong when updating data!");
							throw err2;
						}
						res.send("funciona");
					});
				});
			});
		}else{
			res.send("no funciona");
		}
	});
})
module.exports = router;
