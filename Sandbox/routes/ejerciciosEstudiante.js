var Ejercicio=require('../models/ejercicio')
var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var PythonShell=require('python-shell');




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

router.post('/upload', function(req, res) {
   //El modulo 'fs' (File System) que provee Nodejs nos permite manejar los archivos
   var fs = require('fs')

   var tmp_path = req.files.archivo.path
   var tipo = req.files.archivo.type;
   
		var nombreArchivo= req.files.archivo.name;
		var target_path='./archivos/'+nombreArchivo;
		var pyshell=new PythonShell(target_path);
		


		fs.rename(tmp_path,target_path,function(err){
			if(err) throw err;
			fs.unlink(tmp_path,function(err){
				pyshell.on('message', function (message) {
					// received a message sent from the Python script (a simple "print" statement)
					console.log(message);
					res.send(message);

				});
				
			});
		});
   


})
module.exports = router;
