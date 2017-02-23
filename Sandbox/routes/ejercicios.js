var ejercicio=require('../models/ejercicio')
var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/');
	}
}

var validacion=function(req,res,next){
	console.log(req.user.Rol);
	if(req.user.Rol !="Profesor" && req.user.Rol!="Ayudante"){
  		res.sendStatus(401);
  		return;
  	} 
  	next();	
}

router.get('/',ensureAuthenticated, validacion, function(req, res){
	var ejercicio=mongoose.model('ejercicio');
	ejercicio.find({}, function(err, exercises) {
    if(err) throw err;
		res.render('index-Profesor', {listExercise:exercises});
	});		
});

router.get('/crear', ensureAuthenticated,validacion,function(req, res){
	res.render('ejerciciosCrear');
});

router.post('/crear',function(req, res){
	var nuevoEjercicio= new ejercicio(req.body);
	nuevoEjercicio.save(function(err){ 
		if (err) {
			return err;
  		}
		console.log('ejercicio creado con exito');
	});
	res.redirect('/ejercicios')
});

router.get('/:id',function(req,res){
	var id=req.params.id;
	var busca = {_id: id};
	ejercicio.findOne(busca,function(err, ejercicio){
		if(err) throw err;
		res.send(ejercicio);
	});
})

router.put('/modificar/:id',function(req,res){
	var id=req.params.id;
	var busca = {_id: id};
	var modificacion = ejercicio(req.body);

	ejercicio.findOneAndUpdate(busca, {$set:modificacion}, function(err, doc){
		if(err){					
			console.log("Something wrong when updating data!");
		}
		return res.send('Ejercicio modificado con exito');
	});
});


router.delete('/EliminarEjercicio/:id',function(req,res){
	 var id=req.params.id;
	 var busca = {_id: id};
		ejercicio.findOne(busca,function(err, ejercicio){
			if(err) throw err;
			ejercicio.remove();
			console.log('ejercicio  eliminado con exito');
			return res.send("se ha eliminado");
		});
})

module.exports = router;
