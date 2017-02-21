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
	if(req.user.Rol !="Profesor"){
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

router.delete('/EliminarEjercicio/:id',function(req,res){
	 var id=req.params.id;
	 var busca = {_id: id};
	 var ejercicio2=mongoose.model('ejercicio');
		ejercicio.findOne(busca,function(err, ejercicio){
			if(err) throw err;
			ejercicio.remove();
			console.log('ejercicio  eliminado con exito');
			return res.send("se ha eliminado");
		});
	})
	


module.exports = router;
